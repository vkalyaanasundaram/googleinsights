import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReactHtmlParser from "react-html-parser";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Media() {
  const { asPath, pathname } = useRouter();

  const { observe, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
    rootMargin: "50px",
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // alert(data?.events?.bannerImage);
  return (
    <>
      <Header />
      <Banner data={data?.events?.banner} />
      <div className="bg-white my-10">
        <div ref={observe} className="mx-10">
          <Tabs>
            <TabList>
              {data?.events?.eventDetails.map((value, key) => (
                <Tab key={key}>{value?.eventTitle}</Tab>
              ))}
            </TabList>
            {data?.events?.eventDetails.map((value, key) => (
              <TabPanel key={key} className="react-tabs__tab-panel p-5">
                {ReactHtmlParser(value?.events)}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
