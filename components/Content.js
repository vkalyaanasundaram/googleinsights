import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ContentNav, StaticContent } from "../styles/Home.module.css";

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

const Content = ({ data }) => {
  // console.log(data);
  const { asPath, pathname } = useRouter();

  return (
    <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
      <div className="container">
        <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
          {data?.map((value, key) => (
            <div
              className="overflow-hidden dark:bg-red-100 dark:text-black relative py-10 min-h-min border-2"
              key={key}
            >
              <div className="grid place-items-center w-full text-right">
                {value?.svgIcon?.sourceUrl?.length > 0 && (
                  <Image
                    src={value?.svgIcon?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                    objectFit="cover"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                  />
                )}
              </div>

              <h2 className="text-3xl font-semibold text-center my-10 uppercase text-kapitus">
                {ReactHtmlParser(value?.cardTitle)}
              </h2>
              <div className="place-items-center">
                <p className="mb-4 p-5">{value?.cardContent}</p>
              </div>
              {asPath == "/partner" ? (
                <div className="grid place-items-center w-full text-right my-5 absolute bottom-0">
                  <Link
                    href={`/partner/${value?.cardTitle
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    passHref
                  >
                    <button>LEARN MORE</button>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Content;
