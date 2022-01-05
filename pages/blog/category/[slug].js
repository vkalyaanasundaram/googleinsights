import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import RecentBlogs from "../../../components/blog/recentBlogs";
import AllBlogs from "../../../components/blog/allBlogs";
import BlogCategories from "../../../components/blog/categories";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Categories() {
  const { asPath, pathname } = useRouter();
  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <div className="w-full ">
        <Head>
          <title>Blog - Category</title>
        </Head>
        <Header />
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="xs:w-full md:w-3/4 border-2 border-gray-200 ">
          {data?.category?.posts?.nodes?.map((value, key) => (
            <>
              <div className="container ml-2">
                {value?.featuredImage?.node?.sourceUrl.length > 0 && (
                  <Image
                    src={value?.featuredImage?.node?.sourceUrl}
                    width={1100}
                    height={700}
                    alt=""
                    objectFit="cover"
                    quality={100}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(700, 475)
                    )}`}
                  />
                )}
                <div className="text-kapitus text-2xl my-10">
                  {value?.title}
                </div>
                <div className="text-kapitus text-lg my-10">
                  {ReactHtmlParser(value?.content)}
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="xs:hidden md:w-1/4">
          <RecentBlogs />
          <BlogCategories />
        </div>
      </div>
      <div className="relative">
        <Footer className="fixed" />
      </div>
    </>
  );
}
