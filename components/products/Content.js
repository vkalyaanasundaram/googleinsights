import React, { useEffect, useState } from "react";
import useInView from "react-cool-inview";
import Link from "next/link";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import dynamic from "next/dynamic";
import { contentNav } from "../../styles/Home.module.css";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";

// import Requirements from './Requirements'
// import HowToApply from './HowToApply'
// import Who from './Who'

const Requirements = dynamic(() => import("./Requirements"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const HowToApply = dynamic(() => import("./HowToApply"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const Who = dynamic(() => import("./Who"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const Content = ({ content, desc }) => {
  const { router, asPath } = useRouter();

  return (
    <>
      <div className={contentNav}>
        <div className="container">
          <div className="productSticky">
            <span className="pr-10 text-pink">
              <a href="#Requirement"> Requirements</a>
            </span>
            <span className="pr-10 text-pink">
              <a href="#HowApply"> How To Apply</a>
            </span>
            <span className="pr-10 text-pink">
              <a href="#Who"> Who is this For?</a>
            </span>
          </div>
        </div>
        <div className="w-full my-5 py-10 px-5 bg-kapitus">
          <div className="container text-center text-white text-2xl">
            {ReactHtmlParser(desc)}
          </div>
        </div>
        <div className="xs:w-full md:w-11/12">
          <div className="px-5">{ReactHtmlParser(content)}</div>
        </div>
      </div>
    </>
  );
};

export default Content;
