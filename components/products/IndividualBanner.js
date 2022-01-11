import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import ApplyNow from "../../components/forms/CommonShortForm";
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

export default function IndividualBanner({ data }) {
  const MobileBannerImage = data?.mobileBannerImage?.sourceUrl;
  const BannerImg = data?.banner?.sourceUrl;
  const BannerTitle = data?.title;
  const BannerDescription = data?.bannerDescription;
  const BannerList = data?.bannerData;
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
          <div className="bannerOpacity">
            {MobileBannerImage?.length > 0 && (
              <div className={heroMobileImage}>
                <Image
                  alt=""
                  src={MobileBannerImage}
                  layout="intrinsic"
                  objectFit="cover"
                  width={500}
                  height={900}
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
                  width={data?.banner?.mediaDetails?.width}
                  // height={data?.banner?.mediaDetails?.height}
                  height={1150}
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
                  <div className="xs:w-full text-2xl md:text-2xl lg:text-5xl">
                    {BannerTitle}
                  </div>
                  <div className="xs:w-full my-5 md: text-lg lg:text-3xl text-green-900">
                    {ReactHtmlParser(BannerDescription)}
                  </div>

                  <div className="xs:text-sm mt-5 mb-5 md:text-xl text-kapitus">
                    {BannerList?.map((value, key) => (
                      <div key={key}>
                        <div className="my-2 text-sm md:text-xl ">
                          {value?.listTitle}
                        </div>
                        <div className="text-base leading-8">
                          {ReactHtmlParser(value?.listItems)}
                        </div>
                      </div>
                    ))}
                    {ReactHtmlParser(data?.bannerButton)}
                  </div>

                  <div className="xs:text-xl w-full sm: w-full mt-5 text-xs text-kapitus text-left copyrights">
                    <span className="xs:w-full float-left ">
                      <Image
                        title="25k"
                        src="https://kap-staging.us/wp-content/uploads/2020/05/25k.svg"
                        alt=""
                        width={175}
                        height={45}
                      />
                    </span>
                    <span className="xs:w-full float-left ">
                      <Image
                        title="trustpilot"
                        src="https://kap-staging.us/wp-content/uploads/2020/05/trustpilot.svg"
                        alt=""
                        width={175}
                        height={45}
                      />
                    </span>

                    <span className="xs:w-full float-left ">
                      <Image
                        title="billion"
                        src="https://kap-staging.us/wp-content/uploads/2020/05/billion.svg"
                        alt=""
                        width={175}
                        height={45}
                      />
                    </span>
                    <p className="float-left mt-5 text-xs">
                      Copyright 2021 • Kapitus • All Rights Reserved Loans made
                      in California are issued by Strategic Funding Source, Inc.
                      dba Kapitus, pursuant to California Finance Lenders
                      License No. 603-G807.
                    </p>
                  </div>
                </div>

                <div className="xs:w-full hidden sm:hidden md:block z-50">
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
