import Head from "next/head";
import NextImage from "next/image";
import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import useSWR from "swr";
import { request } from "graphql-request";

import Header from "../Header";
import Footer from "../Footer";
import RecentBlogs from "./recentBlogs";
import AllBlogs from "./allBlogs";
// import CustomImage from '../Image'
import { useRouter } from "next/router";
import BlogCategories from "./categories";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const BlogData = () => {
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

  const router = useRouter();
  const slug = router.query.slug;
  // const blogData = data.postBy

  // post(slug: "${slug}", idType: SLUG) {
  const { data, error } = useSWR(
    `query MyQuery {
        post(id: "${slug}", idType: SLUG) {
          slug
              title
              content
              featuredImage {
                node {
                  sourceUrl(size: LARGE)
                }
              }
        }
      }`,
    fetcher
  );
  const blogData = data?.post;
  // console.log(CustomImage)
  return (
    <div>
      <Head>
        {/* <title>{blogData?.seo?.title}</title>
        <meta name="description" content={blogData?.seo?.metaDesc} />
        <meta name="keywords" content={blogData?.seo?.metaKeywords} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={blogData?.seo?.opengraphTitle} />
        <meta property="og:description" content={blogData?.seo?.opengraphDescription} />
        <meta property="og:url" content={blogData?.seo?.opengraphUrl} />
        <meta property="og:site_name" content={blogData?.seo?.opengraphSiteName} />
        <meta property="article:publisher" content={blogData?.seo?.opengraphPublisher} />
        <meta property="article:modified_time" content={blogData?.seo?.opengraphModifiedTime} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KapitusFinance" />
        <meta name="twitter:label1" content="Est. reading time" />
        <meta name="twitter:data1" content="2 minutes" /> */}
      </Head>
      <Header />
      <div className="flex">
        <div className="xs:w-full sm:w-full md:w-3/4 lg:w-3/4 border-2 border-gray-200 mb-20">
          <div>
            <h1 className="text-4xl m-5">{blogData?.title}</h1>
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
                  className="lazyload"
                  objectFit="contain"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
              </div>
            )}
          </div>
          <div className="blogContent p-5">
            {ReactHtmlParser(blogData?.content)}
          </div>
        </div>
        <div className="xs:hidden md:w-1/4 border-gray-200 ">
          <RecentBlogs />
          <BlogCategories />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogData;
