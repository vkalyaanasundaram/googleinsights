import React from "react";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

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

const ContactUs = (data) => {
  const contactData = data;
  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "kapitus-map",
      style: "mapbox://styles/kapitus/cjtyljmho3vok1fntmnu0c8hq",
      /*center: [-73.98387980000001, 40.75704],*/
      center: [-1.98387980000001, 30.75704],
      zoom: 2,
    });
  });

  return (
    <div className="bg-gray-100">
      <div className="xs: grid-cols-1 md:grid grid-cols-2 gap-4">
        <div className="xs:w-full md:w-1/2">
          <Image
            src={contactData?.data?.image?.mediaItemUrl}
            width={750}
            height={600}
            layout="responsive"
            objectFit="cover"
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            alt=""
          />
        </div>
        <div className="xs:w-full md:w-1/2">&nbsp;</div>
      </div>
      <section className="container" ref={observe}>
        {inView && (
          <div
            id="kapitus-map"
            className="w-full"
            style={{ height: 500 }}
          ></div>
        )}
      </section>
    </div>
  );
};

export default ContactUs;
