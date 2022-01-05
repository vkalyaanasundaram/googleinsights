import Link from "next/link";
import Image from "next/image";
// import useSWR from "swr";
// import { useRouter } from "next/router";
// import { request } from "graphql-request";

// const fetcher = (query) =>
//   request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

export default function Events() {
  //   const { asPath, pathname } = useRouter();
  //   const { data, error } = useSWR(
  //     `query PressRelease {
  //         pressReleases(first: 40) {
  //             nodes {
  //                 link
  //                 title
  //                 slug
  //             }
  //         }
  //     }`,
  //     fetcher
  //   );

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;
  // alert(data?.pressCoverages?.nodes);
  return (
    <>
      <div className="w-full p-10">
        {/* {alert("234")} */}

        <div className="grid grid-cols-1 gap-1 ">
          <div>No Event Found</div>
        </div>
      </div>
    </>
  );
}
