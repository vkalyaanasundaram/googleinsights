import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";

const GroupColumn = ({ columnone, columnTwo, data }) => {
  return (
    <>
      <div className="xs:w-full container px-5 m-10 mx-auto">
        <div className="container">
          <h3>{data?.invoiceTemplate?.groupColumnTitle}</h3>
        </div>
      </div>
      <hr />
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        <div className="container">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnone?.map((value, key) => (
              // alert(value?.groupOneImage?.sourceUrl),
              <div
                className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupOneImage?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center mx-8">
                  {ReactHtmlParser(value?.groupOneTitle)}
                </h3>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupOneContent}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="xs:w-full container px-5 m-10 mx-auto">
        <div className="container">
          <h3>{data?.invoiceTemplate?.groupColumnTitleTwo}</h3>
        </div>
      </div>
      <hr />
      <div className="xs:w-full container px-5 mt-10 mb-10 mx-auto">
        <div className="container">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnTwo?.map((value, key) => (
              <div
                className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupImage?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center mx-8">
                  {ReactHtmlParser(value?.groupTitle)}
                </h3>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupContent}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default GroupColumn;
