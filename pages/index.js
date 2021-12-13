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

const Header = "../components/Header";

// const Banner = dynamic(() => import("../components/Banner"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });

// const Content = dynamic(() => import("../components/Content"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });

// const Footer = dynamic(() => import("../components/Footer"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/page/home", fetcher);

  let { asPath, pathname } = useRouter();
  const router = useRouter();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      <div>Home page</div>
    </>
  );
}
