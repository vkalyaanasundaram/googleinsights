import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const GroupColumn = () => {
  const { router, asPath } = useRouter();
  const { data, error } = useSWR(
    `query GroupComponent {
      productsService(id: "${asPath}", idType: URI) {
        individualProducts {
            groupColumn {
                groupNumber
                groupTitle
                groupContent
            }
        }
      }
    }

    `,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  //   console.log(data)
  const groupColumn = data?.productsService?.individualProducts?.groupColumn;
  return (
    <>
      {groupColumn?.length > 0 ? (
        <div className="container p-10">
          <div className="xs:grid-cols-1 md:grid-cols-3 lg:grid grid-cols-3 gap-4">
            {groupColumn?.map((value, key) => (
              <div key={key}>
                <div className="text-6xl font-bold text-center text-kapitus">
                  {value?.groupNumber}
                </div>
                <div className="text-2xl font-semibold text-center mt-10 text-kapitus">
                  {value?.groupTitle}
                </div>
                <div className="text-base text-center mt-10 text-kapitus">
                  {value?.groupContent}
                </div>
              </div>
            ))}
          </div>
          <div className="my-10">
            <hr />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default GroupColumn;
