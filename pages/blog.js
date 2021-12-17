// import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
// import InfiniteScroll from "react-infinite-scroll-component";

import { useRouter } from "next/router";
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
              mediaDetails {
                width
                height
              }
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
      <Head>
        <title>Blog - Kapitus</title>
      </Head>
      Blogs
    </>
  );
}
