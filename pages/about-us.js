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
//import ScrollSpy from "react-ui-scrollspy";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import React, { useRef, useEffect, useState } from "react";

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
      <Banner data={data?.aboutUs} />
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.aboutUs?.aboutDescription)}
      </div>
      <h3 className="p-10 sticky">OUR HISTORY</h3>

      {/* <div className=" relative ">
        <div className="flex my-20">
          <div className="flex-auto w-1/3 fixed top-1/3 ">
            {data?.aboutUs?.ourHistory.map((value, key) => (
              <div
                key={key}
                className="leftHistory m-10"
                className={scroll ? "active" : "inactive"}
                id={"employee-" + key}
              >
                <ScrollSpy scrollThrottle={100} useBoxMethod={false}>
                <div className="text-kapitus py-3">{value?.noOfEmployees}</div>
                <hr />
                <div className="text-kapitus py-3">{value?.fundedAmount}</div>
                <hr />
                <div className="text-kapitus py-3">{value?.businessFunded}</div>
                </ScrollSpy>
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
      </div> */}

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
                  <div className="text-kapitus py-3">{value?.fundedAmount}</div>
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
      {/*<div className="relative">
        {data?.aboutUs?.ourHistoryRow.map((value, key) => (
          <div key={key}>
            <div className="flex my-20">
              <div
                className="ml-10 w-1/3 top-1/3 employeeContent "
                id={"employee-" + key}
              >
                <div className="leftContent active-scroll-spy p-5">
                  <div className="text-kapitus py-3">
                    {value?.noOfEmployees}
                  </div>
                  <hr />
                  <div className="text-kapitus py-3">{value?.fundedAmount}</div>
                  <hr />
                  <div className="text-kapitus py-3">
                    {value?.businessFunded}
                  </div>
                </div>
              </div>

              <div className="w-1/2 businessContent" id={"content-" + key}>
                <div className="flex">
                  <div className="float-left text-kapitus text-3xl">
                    {value?.companyYear}
                  </div>
                  <div className="float-left ml-10 ">
                    <Image
                      src={value?.svgIcon?.sourceUrl}
                      width="100"
                      alt=""
                      height="100"
                    />
                  </div>
                  <div className="float-left ml-10 text-kapitus text-2xl">
                    {value?.companyData}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        </div>*/}
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto" id="Teams">
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            {data?.aboutUs?.meetTeam.map((value, key) => (
              <div className="m-2 float-left" key={key}>
                <a href={value?.profileImage?.sourceUrl}>
                  <Image
                    src={value?.profileImage?.sourceUrl}
                    width="320"
                    height="380"
                    alt=""
                    srl_gallery_image="true"
                  />
                </a>
              </div>
            ))}
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>

      <section className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        {ReactHtmlParser(data?.aboutUs?.footeContent)}
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
}
