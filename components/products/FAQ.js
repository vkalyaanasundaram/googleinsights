import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import ReactHtmlParser from "react-html-parser";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import { contentNav } from "../../styles/Home.module.css";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const FAQ = () => {
  const [isActive, setIsActive] = useState(false);

  const { router, asPath } = useRouter();
  const { data, error } = useSWR(
    `query individualProduct {
      productsService(id: "${asPath}", idType: URI) {
        faqAcf {
            faqs {
                question
                answer
            }
        }
      }
    }`,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  const faq = data?.productsService?.faqAcf?.faqs;
  //   console.log(faq)
  return (
    <>
      <div className="px-10">
        <h3>FAQs</h3>
        {faq?.map((value, key) => (
          // console.log(data);

          <div className="accordion-item md:w-8/12" key={key}>
            <div
              className="accordion-title"
              onClick={() => setIsActive(!isActive)}
            >
              <div className="py-5 border-gray-300 border-b-2 text-kapitus">
                {value?.question}
                <span className="float-right">{isActive ? "-" : "+"}</span>
              </div>
            </div>
            {isActive && (
              <div className="accordion-content float-left p-5 bg-gray-100">
                {ReactHtmlParser(value?.answer)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
