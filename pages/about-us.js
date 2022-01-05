import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import AboutBanner from "../components/AboutBanner";
import Center from "../components/about";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
//import ScrollSpy from "react-ui-scrollspy";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import React, { useRef, useEffect, useState } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Content = dynamic(() => import("../components/Content"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function AboutUs() {
  const { asPath, pathname } = useRouter();
  const elementRef = React.createRef();
  const [showHistory, setShowHistory] = useState(false);
  const fixed = useRef();
  // const [showEmp, setShowEmp] = useState(false);
  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;
  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const options = {
    settings: {
      overlayColor: "#00395d",
    },
    buttons: {
      backgroundColor: "#72b664",
      iconColor: "#fff",
    },
    caption: {
      captionColor: "#a6cfa5",
      captionTextTransform: "uppercase",
    },
  };

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

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const showEmployeeCont = () => {
    if (window.scrollY >= 700) {
      setShowHistory(false);
    } else {
      let employeeZero = document.querySelector("#employee-0");
      let employeeOne = document.querySelector("#employee-1");
      let employeeTwo = document.querySelector("#employee-2");
      let employeeThree = document.querySelector("#employee-3");
      let employeeFour = document.querySelector("#employee-4");
      let employeeFive = document.querySelector("#employee-5");

      setShowHistory(true);
    }
  };

  useEffect(() => {
    const handleScrollPos = () => {
      if (window.scrollY <= 795) {
        fixed.current.style.position = "relative";
        fixed.current.style.top = "55px";
      } else if (window.scrollY > 795 && window.scrollY < 2250) {
        fixed.current.style.position = "fixed";
        fixed.current.style.top = "165px";
      } else {
        fixed.current.style.position = "absolute";
        fixed.current.style.top = "1489px";
      }

      var current;
      let section = [
        "section_1",
        "section_2",
        "section_3",
        "section_4",
        "section_5",
        "section_6",
        "section_7",
        "section_8",
      ];
      section.map((item) => {
        if (document.getElementById(item).offsetTop + 700 <= window.scrollY) {
          current = item;
        }
      });

      let fixedsection = [
        "section-1",
        "section-2",
        "section-3",
        "section-4",
        "section-5",
        "section-6",
        "section-7",
        "section-8",
      ];
      if (current) {
        let actele = current.replace("_", "-");

        fixedsection.map((item, i) => {
          if (item == actele) {
            let element = document.getElementById(item).classList;
            element.add("active");
            element.remove("inactive");
          } else {
            let element = document.getElementById(item).classList;
            element.remove("active");
            element.add("inactive");
          }
        });
      }
    };
    window.addEventListener("scroll", handleScrollPos);

    return () => window.removeEventListener("scroll", handleScrollPos);
  }, [fixed]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <Header />
      <AboutBanner data={data?.aboutUs} />
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.aboutUs?.aboutDescription)}
      </div>
      <h3 className="p-10 sticky">OUR HISTORY</h3>
      <BrowserView>
        <div className="md:flex mx-2 mb-8 relative">
          <div className="w-1/3 px-2">
            <div ref={fixed} className="bg-grey-light">
              {data?.aboutUs?.ourHistoryRow.map((value, key) => (
                <div
                  key={key}
                  className={`ml-10 employeeContent ${
                    key == 0 ? `active` : `inactive`
                  }`}
                  id={`section-${key + 1}`}
                >
                  <div className="leftContent active-scroll-spy p-5 w-64">
                    <div className="text-kapitus py-3">
                      {value?.noOfEmployees}
                    </div>
                    <hr />
                    <div className="text-kapitus py-3">
                      {value?.fundedAmount}
                    </div>
                    <hr />
                    <div className="text-kapitus py-3">
                      {value?.businessFunded}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3 px-2">
            <div className="bg-grey">
              {data?.aboutUs?.ourHistoryRow.map((value, key) => (
                <div
                  key={key}
                  id={`section_${key + 1}`}
                  className="md:pt-16 md:pb-8 businessContent flex w-full items-center"
                >
                  <div className="text-right w-1/3 pr-20 text-kapitus text-3xl">
                    {value?.companyYear}
                  </div>
                  <div className="float-left w-1/5">
                    <Image
                      src={value?.svgIcon?.sourceUrl}
                      width="80"
                      alt=""
                      height="100"
                    />
                  </div>
                  <div className="text-left w-1/2 text-kapitus text-2xl pr-4">
                    {value?.companyData}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xs:w-full px-5 mt-10 mb-10 mx-auto" id="Teams">
          <SimpleReactLightbox>
            <SRLWrapper options={options}>
              {data?.aboutUs?.meetTeam.map((value, key) => (
                <div key={key} className="text-center">
                  <div className="m-2 float-left">
                    <a href={value?.profileImage?.sourceUrl}>
                      <Image
                        src={value?.profileImage?.sourceUrl}
                        width="300"
                        height="340"
                        alt=""
                        srl_gallery_image="true"
                      />
                    </a>
                    <div>
                      <h4>{value?.name}</h4>
                      <span>{value?.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </SRLWrapper>
          </SimpleReactLightbox>
        </div>
      </BrowserView>
      {/* Mobile View Our History */}
      <MobileView>
        <section className="xs:w-full px-5 my-10 mx-5 shadow-md">
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            transitionDuration={800}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            autoPlay={true}
            autoPlaySpeed={4000}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {data?.aboutUs?.ourHistoryRow.map((value, key) => (
              <>
                <setion
                  className="float-left w-full text-sm text-center"
                  key={key}
                >
                  <div className="my-3">{value?.noOfEmployees}</div>
                  <hr />
                  <div className="my-3">{value?.fundedAmount}</div>
                  <hr />
                  <div className="my-3">{value?.businessFunded}</div>
                </setion>

                <div
                  id={`section_${key + 1}`}
                  className="md:pt-16 md:pb-8 text-center w-full items-center"
                >
                  <div className="xs:w-full my-10 clear-both text-center text-2xl">
                    {value?.companyYear}
                  </div>
                  <div className="xs:w-full sm:w-full">
                    <Image
                      src={value?.svgIcon?.sourceUrl}
                      width="80"
                      alt=""
                      height="100"
                    />
                  </div>
                  <div className="xs:w-full text-center mb-10 text-kapitus text-sm pr-4">
                    {value?.companyData}
                  </div>
                </div>
              </>
            ))}
          </Carousel>
        </section>
      </MobileView>
      {/* Mobile View Teams */}
      <MobileView>
        <section className="xs:w-full px-5 mt-10 mb-10 mx-auto md:container">
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            keyBoardControl={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            transitionDuration={800}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {data?.aboutUs?.meetTeam.map((value, key) => (
              <div className="m-2 float-left" key={key}>
                <a href={value?.profileImage?.sourceUrl}>
                  <Image
                    src={value?.profileImage?.sourceUrl}
                    width="300"
                    height="380"
                    layout="intrinsic"
                    objectFit="cover"
                    quality={100}
                    srl_gallery_image="true"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                    alt="Kapitus"
                  />
                </a>
                <div>
                  <h3>{value?.name}</h3>
                </div>
                <div>
                  <h4>{value?.role}</h4>
                </div>
                <div className="text-sm careerDetails">
                  <p>{ReactHtmlParser(value?.careerDetails)}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </section>
      </MobileView>
      <section className="xs:w-full md: float-left mx-5 px-5 py-10">
        {ReactHtmlParser(data?.aboutUs?.footeContent)}
      </section>
      <section className="xs:w-full md:w-full float-left clear-both">
        <Footer />
      </section>
    </>
  );
}
