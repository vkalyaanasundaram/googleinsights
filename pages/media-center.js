import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/MediaBanner";
import MediaCenter from "../components/pages/MediaCenter";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import AllMedia from "../components/media-center/all";
import PressReleases from "../components/media-center/pressRelease";
import EventsList from "../components/media-center/events";
import PressCoverages from "../components/media-center/pressCoverages";

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
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      <Banner data={data?.page?.mediaCenter} />
      <div className="bg-white">
        <div ref={observe} className="mx-10">
          {inView && <MediaCenter data={data?.page?.mediaCenter?.twoColumn} />}
        </div>
      </div>
      <div className="bg-white my-10">
        <div ref={observe} className="mx-10">
          {inView && (
            <Tabs>
              <TabList className="xs:text-center md:text-right">
                <Tab>All</Tab>
                <Tab>Events</Tab>
                <Tab>Press Release</Tab>
                <Tab>Press Coverage</Tab>
              </TabList>

              <TabPanel className="bg-gray-100">
                <AllMedia data={data} />
              </TabPanel>
              <TabPanel className="bg-gray-100">
                <EventsList />
              </TabPanel>
              <TabPanel className="bg-gray-100">
                <PressReleases />
              </TabPanel>
              <TabPanel className="bg-gray-100">
                <PressCoverages />
              </TabPanel>
            </Tabs>
          )}
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
