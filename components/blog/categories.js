import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

//GraphQL components and moduless
import { gql } from "@apollo/client";
import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const BlogCategories = () => {
  const { data, error } = useSWR(
    `{
        categories(first: 50) {
            nodes {
                slug
                link
                name
            }
        }
    }
`,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  // alert(data);
  const blogCategory = data.categories.nodes;

  return (
    <div className="p-2">
      <div>
        <h1 className="text-2xl uppercase ml-5 text-green-900">Categories</h1>
      </div>
      <div className="px-5 py-5">
        {blogCategory.map((post, key) => (
          <div key={key}>
            <Link
              href={`/blog/category/${post.slug}`}
              passHref
              prefetch={false}
            >
              <div
                className="mt-2 text-lg text-kapitus cursor-pointer"
                title={post.name}
              >
                {post.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
