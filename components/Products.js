import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";

export default function ProductsContainer({ data }) {
  const router = useRouter();

  const cardPage = (href) => {
    // console.log(href)
    router.push(href);
  };

  return (
    <>
      <div className="w-full p-10">
        <div className="container mx-auto">
          <div>{ReactHtmlParser(data?.ourGoal)}</div>
          <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {data?.productsCards?.map((value, key) => (
              <div className="relative border-2 my-5 dark:bg-red-100" key={key}>
                <div className="grid place-items-center w-full text-right my-5">
                  <Image
                    src={value?.svgIcon?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h3 className="xs:text-xs mx-3 md:font-normal text-kapitus mt-4 mb-4 text-center mx-8 uppercase">
                  {value?.cardTitle}
                </h3>
                <div className="xs:mobileContent text-center text-lg px-5 text-kapitus md:productContent">
                  {ReactHtmlParser(value?.cardContent)}
                </div>
                <div className="absolute bottom-1 w-full text-center place-items-center ">
                  <button
                    className="shadow-md p-5 py-3 bg-blue-900 text-sm"
                    onClick={(e) => {
                      cardPage(value?.cardSlug);
                    }}
                  >
                    {ReactHtmlParser(value?.cardButton)}
                  </button>
                </div>
              </div>
            ))}
          </section>
          <div>{ReactHtmlParser(data?.getStartedToday)}</div>
        </div>
      </div>
    </>
  );
}
