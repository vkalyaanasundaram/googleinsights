import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

import ContactUs from "../components/pages/ContactUs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// const Footer = dynamic(() => import("../components/Footer"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });
export default function Contant() {
  const { asPath, pathname } = useRouter();

  // const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

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

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // const ACFcontact = data?.ACFcontact;

  return (
    <>
      {/* <Header /> */}
      {/* <ContactUs data={ACFcontact} /> */}
      {/* <div className="xs: grid-cols-1 md:grid grid-cols-2 gap-4">
        <div className="xs:w-full md:w-1/2">
          <Image
            src="https://kap-staging.us/wp-content/uploads/2020/05/HeroImages_secondarypage_contactus-2-1.jpg"
            width={750}
            height={600}
            layout="responsive"
            objectFit="cover"
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            alt=""
          />
        </div>
        <div className="xs:w-full md:w-1/2">&nbsp;</div>
      </div> */}
      {/* <section ref={observe}>{inView && <Footer />}</section> */}
    </>
  );
}
