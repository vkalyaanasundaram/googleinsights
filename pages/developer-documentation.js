import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function DeveloperDoc() {
  return (
    <>
      <Header />
      <div className="mb-10">
        <iframe
          loading="lazy"
          id="typeform-full"
          src="https://sandbox.kapitus.com/docs/"
          width="100%"
          height="650px"
          frameBorder="0"
        ></iframe>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
