export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_CATEGORY_BLOG = `query CategoryBlog($id: ID!) {
    category(idType: SLUG, , id: $id) {
        name
            posts(first: 100) {
                nodes {
                    slug
                    title
                    content
                    featuredImage {
                        node {
                            sourceUrl
                            mediaDetails {
                            width
                            height
                            }
                        }
                    }
                }
            }
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_CATEGORY_BLOG,
      variables: {
        id: slug,
      },
    }),
  });

  const json = await data.json();
  //   console.log(json);
  resp.json(json?.data);
  // }
};
