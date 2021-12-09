import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Center from "../components/about";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import ReactHtmlParser from "react-html-parser";
import ScrollSpy from "react-ui-scrollspy";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import React, { useEffect, useState } from "react";

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
  const [scrollY, setScrollY] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (window.scrollY > 650) {
        setShowHistory(true);
      }
      if (window.scrollY > 1500) {
        setShowHistory(false);
      }
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 650);
      });
    };
  }, []);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <Header />
      <Banner data={data?.aboutUs} />
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.aboutUs?.aboutDescription)}
      </div>
      <h3 className="p-10 sticky">OUR HISTORY</h3>

      <div className=" relative ">
        <div className="flex my-20">
          <div className="flex-auto w-1/3 fixed top-1/3 ">
            {data?.aboutUs?.ourHistory.map((value, key) => (
              <div
                key={key}
                // className="leftHistory m-10"
                className={scroll ? "active" : "inactive"}
                id={"employee-" + key}
              >
                {/* <ScrollSpy scrollThrottle={100} useBoxMethod={false}> */}
                <div className="text-kapitus py-3">{value?.noOfEmployees}</div>
                <hr />
                <div className="text-kapitus py-3">{value?.fundedAmount}</div>
                <hr />
                <div className="text-kapitus py-3">{value?.businessFunded}</div>
                {/* </ScrollSpy> */}
              </div>
            ))}
          </div>
          <div className="flex-col mx-10 w-1/3 left-1/3 relative">
            {data?.aboutUs?.ourHistory.map((value, key) => (
              <div
                key={key}
                className="float-left clear-both my-10 rightHistory"
                id={key + "-content"}
              >
                <div className="text-kapitus text-3xl">
                  {value?.companyYear}
                </div>
                <div className="ml-10 ">
                  <Image
                    src={value?.svgIcon?.sourceUrl}
                    width="100"
                    alt=""
                    height="100"
                    align="left"
                  />
                </div>
                <div className="text-kapitus text-2xl ml-10">
                  {value?.companyData}
                </div>
              </div>
            ))}
          </div>
          <div className="fixed-center">Scroll position: {scrollY}px</div>
        </div>
      </div>

      <div id="Teams">
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            {data?.aboutUs?.meetTeam.map((value, key) => (
              <div className="m-2 float-left" key={key}>
                <a href={value?.profileImage?.sourceUrl}>
                  <Image
                    src={value?.profileImage?.sourceUrl}
                    width="350"
                    height="420"
                    alt=""
                    srl_gallery_image="true"
                  />
                </a>
              </div>
            ))}
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>

      <div className="xs:w-full p-10 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.aboutUs?.footeContent)}
      </div>
      <Footer />
    </>
  );
}