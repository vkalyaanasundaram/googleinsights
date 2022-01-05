import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import RecentBlogs from "../components/blog/recentBlogs";
import AllBlogs from "../components/blog/allBlogs";
import BlogCategories from "../components/blog/categories";
import SearchBlogs from "../components/blog/SearchBlogs";
import Subscribe from "../components/blog/Subscribe";
import Header from "../components/Header";

// const Header = dynamic(() => import("../components/Header"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
`;

const BATCH_SIZE = 10;

export default function InfiniteScrollList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
    notifyOnNetworkStatusChange: true,
  });

  function fetchMorePosts() {
    fetchMore({ variables: { after: data.posts.pageInfo.endCursor } });
  }

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  const posts = data.posts.edges.map((edge) => edge.node);
  const haveMorePosts = Boolean(data.posts?.pageInfo?.hasNextPage);

  // const config = {
  //   unstable_runtimeJS: false,
  // };

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
      <div className="w-full ">
        <Head>
          <title>Blog - Kapitus</title>
        </Head>
        <Header />
      </div>

      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          <div className="xs:w-full md:w-3/4 border-2 border-gray-200 ">
            <BrowserView>
              {posts?.map((key, index) => (
                <>
                  {index === 0 ? (
                    <div className="w-full">
                      <Link
                        href={`/blog/${key.slug}`}
                        passHref
                        key={index}
                        prefetch={false}
                      >
                        <div className="text-left mx-10">
                          {key?.featuredImage?.node?.sourceUrl.length > 0 && (
                            <Image
                              src={key?.featuredImage?.node?.sourceUrl}
                              alt="Blogs Image"
                              quality={100}
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                shimmer(700, 475)
                              )}`}
                              width={1000}
                              height={700}
                              className="blogImgSize"
                              layout="intrinsic"
                            />
                          )}
                          <div className="xs:text-center md:text-lg text-kapitus text-left ">
                            <Link
                              href={`/blog/${key.slug}`}
                              passHref
                              key={index}
                              prefetch={false}
                            >
                              <a> {ReactHtmlParser(key.title)}</a>
                            </Link>
                          </div>
                          <div>
                            {ReactHtmlParser(key.content.substring(0, 400))}...
                          </div>
                          <div className="py-5">
                            <Link
                              href={`/blog/${key.slug}`}
                              passHref
                              key={index}
                              prefetch={false}
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
              ))}
            </BrowserView>
            <div className="flex flex-col md:flex-row">
              <div className="xs:w-full md:w-full ">
                <InfiniteScroll
                  dataLength={posts.length}
                  next={fetchMorePosts}
                  hasMore={haveMorePosts}
                  loader={<p>Loading...</p>}
                  endMessage={<p>✅ All posts loaded.</p>}
                >
                  <div className="xs:grid grid-col-1 w-full mt-10 md:grid grid-cols-3 gap-4 mt-10">
                    {posts?.map((key, index) => (
                      <div key={key}>
                        <Link
                          href={`/blog/${key.slug}`}
                          passHref
                          key={index}
                          prefetch={false}
                        >
                          <div className="text-center">
                            {key?.featuredImage?.node?.sourceUrl.length > 0 && (
                              <Image
                                src={key?.featuredImage?.node?.sourceUrl}
                                width={250}
                                height={150}
                                layout="intrinsic"
                                alt="Blogs Image"
                                objectFit="cover"
                                quality={100}
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                  shimmer(700, 475)
                                )}`}
                              />
                            )}
                            <div className="xs:text-center mx-10 md:text-lg text-blue-900 text-left ">
                              {ReactHtmlParser(key.title)}...
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
                <div></div>
              </div>
            </div>
          </div>
          <div className="xs:hidden md:w-1/4">
            <SearchBlogs />
            <RecentBlogs />
            <Subscribe />
            <BlogCategories />
          </div>
        </div>
      </div>
      <div className="float-left clear-both">
        <Footer />
      </div>
    </>
  );
}
