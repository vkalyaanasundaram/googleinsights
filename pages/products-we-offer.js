import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import ReactHtmlParser from "react-html-parser";
import dynamic from "next/dynamic";

import Products from "../components/Products";
import CarouselComponent from "../components/Carousel";
import ProductBanner from "../components/products/Banner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function ProductsWeOffer() {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const ProductsData = data?.productsAcf;
  const AccordionData = data?.accordionData;
  const getStartedData = data?.productsAcf?.getStartedToday;

  return (
    <>
      <Header />
      <div className="float-left clear-both w-full">
        <ProductBanner data={ProductsData} />
      </div>
      <div ref={observe}>{inView && <Products data={ProductsData} />}</div>
      <div ref={observe}>
        {inView && <CarouselComponent data={data?.carouselAcf} />}
      </div>
      {/* <div className="container mx-10">
        {ReactHtmlParser(getStartedData)}
      </div> */}

      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
