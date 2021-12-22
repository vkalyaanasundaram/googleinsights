import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../../styles/Home.module.css";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import ApplyNow from "../../components/forms/applynow";

export default function IndividualBanner({ data }) {
  const MobileBannerImage = data?.invoiceMobileBanner?.sourceUrl;
  const BannerImg = data?.bannerImage?.sourceUrl;
  const BannerTitle = data?.bannerTitle;
  const BannerDescription = data?.bannerDescription;
  const BannerList = data?.bannerLists;
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

  return (
    <>
      <section className="relative">
        <div className={bgWrap}>
          <div className="opacity-40">
            {MobileBannerImage?.length > 0 && (
              <div className={heroMobileImage}>
                <Image
                  alt=""
                  src={MobileBannerImage}
                  layout="intrinsic"
                  objectFit="cover"
                  width={data?.invoiceMobileBanner?.mediaDetails?.width}
                  height={1100}
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
              </div>
            )}

            {BannerImg?.length > 0 && (
              <div className={heroDesktopImage}>
                <Image
                  alt=""
                  src={BannerImg}
                  width={data?.bannerImage?.mediaDetails?.width}
                  height={data?.bannerImage?.mediaDetails?.height}
                  layout="responsive"
                  objectFit="cover"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
              </div>
            )}
          </div>
          <div className="container">
            <div className={bgText}>
              <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
                <div className="text-kapitus mb-10 z-50">
                  <div className="xs:w-full text-2xl lg:text-5xl">
                    {BannerTitle}
                  </div>
                  <div className="xs:text-lg mt-10 mb-10 lg:text-2xl text-green-900">
                    {ReactHtmlParser(BannerDescription)}
                  </div>

                  <div className="xs:text-sm mt-5 mb-5 md:text-xl text-kapitus">
                    {BannerList?.map((value, key) => (
                      <div key={key}>
                        <div className="text-lg my-2">{value?.listTitle}</div>
                        <div className="text-xs leading-8">
                          {ReactHtmlParser(value?.bannerList)}
                        </div>
                      </div>
                    ))}
                    {ReactHtmlParser(data?.bannerButton)}
                  </div>
                </div>

                <div className="xs: hidden sm:hidden md:block ">
                  <ApplyNow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
