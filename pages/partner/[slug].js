import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import useInView from "react-cool-inview";

import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ReactHtmlParser from "react-html-parser";

const Content = dynamic(() => import("../../components/PartnerContent"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Footer = dynamic(() => import("../../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PartnerPage() {
  // const { data, error } = useSWR("./api/page/problems-we-solve", fetcher);
  const { asPath, pathname } = useRouter();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      <Banner data={data?.PartnerACF} />
      <div>
        <div className="py-10 w-full">
          <div ref={observe}>
            <Content data={data?.PartnerACF?.threeColumn} />
          </div>
        </div>
        <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto text-center">
          {ReactHtmlParser(data?.PartnerACF?.rightPartnershipForYou)}
        </div>
        <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
          <hr className="w-11/12" />
        </div>
        <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
          <div className="my-10  text-4xl">How it Works</div>
          {data?.PartnerACF?.howItWorks.map((value, key) => (
            <div className="xs:w-full md:w-1/4 float-left mb-20" key={key}>
              <div className="text-center">
                <Image
                  src={value?.svgIcon?.sourceUrl}
                  width="100"
                  height="100"
                  alt=""
                />
              </div>
              <div className="text-center text-3xl text-blue-800">
                {value?.title}
              </div>
            </div>
          ))}
        </div>
        <div className="xs:w-full container px-5 my-20 mx-auto">
          {ReactHtmlParser(data?.PartnerACF?.joinToday)}
          <div>
            <button>SIGN UP</button>
          </div>
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
