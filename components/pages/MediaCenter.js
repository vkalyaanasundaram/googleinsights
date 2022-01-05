import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { useState, useEffect } from "react";
import { contentNav } from "../../styles/Home.module.css";
const MediaCenter = ({ data }) => {
  return (
    <div className="py-5">
      <div className="xs:grid=cols-1 md:grid=cols-1 lg:grid grid-cols-2 gap-4">
        {data?.map((value, key) => (
          <div
            className="xs:w-full p-10 shadow-sm bg-white text-center"
            key={key}
          >
            <div>
              <Image
                src={value?.callUs?.sourceUrl}
                width="100"
                height="100"
                alt=""
              />
            </div>
            <div className="m-5 text-3xl text-kapitus">
              <Link href="#">{value.columnTitle}</Link>
            </div>
            <div className="m-5 text-xl text-kapitus">
              <Link href="#">{value.columnContent}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCenter;
