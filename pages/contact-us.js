import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";

import { useState, useEffect } from "react";

const Map = dynamic(() => import("../components/pages/ContactUs"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function Contant() {
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

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  return (
    <>
      <Header />
      <div className="xs:grid-cols-1 md:grid grid-cols-2 gap-4">
        <div className="xs:w-full">
          <Image
            src="https://kap-staging.us/wp-content/uploads/2020/05/HeroImages_secondarypage_contactus-2-1.jpg"
            width={750}
            height={600}
            layout="intrinsic"
            objectFit="contain"
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            alt=""
          />
        </div>
        <div className="xs:w-full md:w-1/2">&nbsp;</div>
      </div>
      {inView && <Map />}
      <section ref={observe}>{inView && <Footer />}</section>
    </>
  );
}
