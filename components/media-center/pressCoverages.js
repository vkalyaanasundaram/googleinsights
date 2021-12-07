import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { request } from "graphql-request";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);
export default function PressCoverage() {
  const { asPath, pathname } = useRouter();
  const { data, error } = useSWR(
    `query MyQuery {
        pressCoverages(first: 100) {
          nodes {
            link
            title
            slug
          }
        }
      }`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // alert(data?.pressCoverages?.nodes);
  return (
    <>
      <div className="xs:p-5 w-full md:p-10">
        {/* {alert("234")} */}

        <div className="xs:gird-col-1 md:grid grid-cols-4 gap-1  bg-white">
          {data?.pressCoverages?.nodes?.map((value, key) => (
            <div
              className="shadow-md py-10 px-2 border-2 text-kapitus"
              key={key}
            >
              {value?.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
