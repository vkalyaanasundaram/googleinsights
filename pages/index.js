import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { bgWrap, bgText } from "../styles/Home.module.css";
import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

const Header = dynamic(() => import("../components/Header"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Banner = dynamic(() => import("../components/Banner"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const Content = dynamic(() => import("../components/Content"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const FinanceSolution = dynamic(() => import("../components/FinanceSolution"), {
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

  // const bannerContent = data?.page?.ThreeColumnStaticPage?.banner;

  return (
    <>
      <Head>
        <script
          defer
          src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb"
        ></script>
      </Head>
      <Header />
      {/* <section>
        <Banner data={data?.page?.ThreeColumnStaticPage?.banner} />
      </section>
      <section ref={observe}>
        {inView && (
          <script
            defer
            src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb"
          ></script>
        )}
      </section>

      <section ref={observe}>
        {inView && <Content data={data?.page?.ThreeColumnStaticPage?.cards} />}
      </section>
      <section ref={observe}>{inView && <Footer />}</section> */}
    </>
  );
}
