import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

import ContactUs from "../components/pages/ContactUs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant() {
  const { asPath, pathname } = useRouter();

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const ACFcontact = data?.ACFcontact;

  return (
    <>
      <Header />
      <ContactUs data={ACFcontact} />
      <div>
        <Footer />
      </div>
    </>
  );
}
