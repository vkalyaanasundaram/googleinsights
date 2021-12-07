import Head from "next/head";
import NextImage from "next/image";

import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import RecentBlogs from "./recentBlogs";
import AllBlogs from "./allBlogs";
import BlogCategories from "./categories";

const AcfData = ({ data }) => {
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

  const blogData = data.postBy.blogsAcf;
  const seo = data.postBy.seo;
  // console.log(seo);
  return (
    <div>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.metaDesc} />
        <meta name="keywords" content={seo?.metaKeywords} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo?.opengraphTitle} />
        <meta property="og:description" content={seo?.opengraphDescription} />
        <meta property="og:url" content={seo?.opengraphUrl} />
        <meta property="og:site_name" content={seo?.opengraphSiteName} />
        <meta property="article:publisher" content={seo?.opengraphPublisher} />
        <meta
          property="article:modified_time"
          content={seo?.opengraphModifiedTime}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KapitusFinance" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="2 minutes" />
      </Head>

      <div className="xs:w-full sm:w-full md:w-full lg:w-3/4 float-left border-2 border-gray-200 ">
        <h1 className="text-4xl">{blogData?.blogTitle}</h1>

        <div>
          {blogData?.featuredImage?.node?.sourceUrl.length > 0 && (
            <div
              className="xs:w-10/12 md: w-3/4"
              style={{ position: "relative", width: "100%", height: "auto" }}
            >
              <NextImage
                src={blogData?.featuredImage?.node.sourceUrl}
                alt={blogData?.blogImage?.title}
                layout="responsive"
                width={700}
                height={475}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
          )}
        </div>
        <div className="blogContent">
          {ReactHtmlParser(blogData?.blogContent)}
        </div>
      </div>
      <div className="xs:hidden lg:w-1/4 float-left border-gray-200 ">
        <RecentBlogs />
        <BlogCategories />
      </div>
    </div>
  );
};

export default AcfData;
