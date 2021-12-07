import Head from "next/head";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import ReactHtmlParser from "react-html-parser";

export default function CarouselComponent({ data }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      autoPlay={true}
      autoPlaySpeed={2000}
      transitionDuration={800}
    >
      {data?.carouselData.map((value, key) => (
        <div className="w-full min-h-screen" key={key}>
          <div className="w-1/2">
            <Image
              src={value?.carouselImage?.sourceUrl}
              // width={getWidth() * value?.carouselImage?.sourceUrl.length}
              width="1000"
              height="1000"
              layout="fill"
              alt="Mountains"
              objectFit="cover"
              className="opacity-50"
            />
          </div>
          <div className="xs:w-full absolute inset-y-0 right-5 md:top-1/4">
            <div className="p-4 text-red-900">
              {ReactHtmlParser(value?.carouselContent)}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
