import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../styles/Home.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";

const Header = dynamic(() => import("../components/Header"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
// const Banner = dynamic(() => import("../components/Banner"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });

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

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/page/home", fetcher);

  let { asPath, pathname } = useRouter();
  const router = useRouter();

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
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      {/* <section>
        <Script src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb" />
      </section> */}
      <section>
        <Content data={data?.page?.ThreeColumnStaticPage?.cards} />
      </section>
      <section ref={observe}>{inView && <Footer />}</section>
    </>
  );
}
