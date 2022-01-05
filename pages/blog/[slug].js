// Graphql components
import Head from "next/head";
// styles
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { useRouter } from "next/router";

import useSWR from "swr";
import { request } from "graphql-request";
import AcfData from "../../components/blog/AcfData";
import BlogData from "../../components/blog/blogData";

const config = {
  unstable_runtimeJS: false,
};

// const globalId = btoa(`GravityFormsForm:54`);

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);
export default function SinglePage() {
  const router = useRouter();
  const slug = router.query.slug;
  const { data, error } = useSWR(
    `query MyQuery {
      postBy(slug: "${slug}") {
        slug
        title
      }
    }
    `,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  const blogData = data.postBy.blogsAcf;

  if (blogData?.blogContent && blogData?.blogImage && blogData?.blogTitle) {
    return (
      <>
        <div className="w-full">
          <AcfData data={data} />
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* <div> Blog Data</div> */}
        <div className="w-full">
          <BlogData />
        </div>
      </>
    );
  }
}
