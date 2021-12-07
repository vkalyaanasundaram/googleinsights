import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { contentNav } from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function SuccessStories() {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  //   alert(data?.successStoriesACF?.pageLargeSlider);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Header />
      <div className={contentNav} ref={observe}>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          transitionDuration={800}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {data?.successStoriesACF?.pageLargeSlider?.map((value, key) => (
            // alert(value?.sliderImage?.sourceUrl),
            <div
              key={key}
              width={value?.sliderImage?.sourceUrl?.mediaDetails?.width}
              style={{ minHeight: "700px" }}
            >
              <Image
                src={value?.sliderImage?.sourceUrl}
                // width={getWidth() * value?.carouselImage?.sourceUrl.length}
                width={value?.sliderImage?.sourceUrl?.mediaDetails?.width}
                height={value?.sliderImage?.mediaDetails?.height}
                layout="fill"
                alt=""
                objectFit="cover"
                className="opacity-50"
              />
              &nbsp;
              <div className="xs:w-full container px-5 m-10 mx-auto SuccessContent">
                {ReactHtmlParser(value?.sliderContent)}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        <div className="container">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {data?.successStoriesACF?.suggestedResources?.map((value, key) => (
              <div key={key} className="bg-gray-100 p-10 border-4">
                <div className="text-center">
                  <Link href={value?.link} target="_blank">
                    <a target="_blank">
                      <Image
                        src={value?.svgIcon?.sourceUrl}
                        width={100}
                        height={100}
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
                <div className="text-center mt-10 font-semibold text-xl text-kapitus ">
                  <Link href={value?.link} target="_blank">
                    <a target="_blank">{value?.resourceContent}</a>
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className={contentNav} ref={observe}>
        <div className="mb-10">
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            transitionDuration={800}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {data?.successStoriesACF?.carouselSlider?.map((value, key) => (
              // alert(value?.sliderImage?.sourceUrl),
              <div
                key={key}
                width={value?.sliderImage?.sourceUrl?.mediaDetails?.width}
                style={{ minHeight: "500px" }}
              >
                <Image
                  src={value?.carouselImage?.sourceUrl}
                  // width={getWidth() * value?.carouselImage?.sourceUrl.length}
                  width={value?.carouselImage?.sourceUrl?.mediaDetails?.width}
                  height={value?.carouselImage?.mediaDetails?.height}
                  layout="fill"
                  alt=""
                  objectFit="cover"
                  className="opacity-50"
                />
                &nbsp;
                <div className="xs:w-full container px-5 m-10 mx-auto">
                  {ReactHtmlParser(value?.carouselContent)}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.successStoriesACF?.footerContent)}
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
