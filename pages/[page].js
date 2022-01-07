import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import useInView from "react-cool-inview";

import FinanceSolutions from "../components/FinanceSolution";
import MediaCenter from "../components/pages/MediaCenter";
import Banner from "../components/Banner";
import ReactHtmlParser from "react-html-parser";

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SinglePage() {
  // const { data, error } = useSWR("./api/page/problems-we-solve", fetcher);
  const { asPath, pathname } = useRouter();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const ThreeColumnStaticPage = data?.ThreeColumnStaticPage;
  const BannerData = data?.ThreeColumnStaticPage?.banner;
  const AccordionData = data?.accordionData;

  return (
    <>
      <Header />
      <Banner data={BannerData} />
      <div>
        <div className="py-10 w-full">
          <div ref={observe}>
            <Content data={ThreeColumnStaticPage?.cards} />
          </div>
        </div>
        <div className="w-full px-5">
          <FinanceSolutions data={ThreeColumnStaticPage} />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>

    //   <Header />
    //   <Banner data={BannerData} />
    //   <div className={contentNav}>
    //     <div className="container py-10 px-5">
    //       <div ref={observe}>
    //         {inView && <Content data={ThreeColumnStaticPage?.cards} />}
    //       </div>
    //     </div>
    //   </div>
    //   <div ref={observe}>{inView && <FinanceSolutions />}</div>
    //   <div ref={observe}>{inView && <Footer />}</div>
    // </>
  );
}
