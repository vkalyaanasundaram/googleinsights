export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  resp.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const errorCode = resp.ok ? false : resp.statusCode;

  const QUERY_SINGLE_POST = `
  query HomePage {
        page(idType: ID, id: "cG9zdDoyNDYzMA==") {
          title
          uri
          ThreeColumnStaticPage {
            cards {
              cardContent
              cardTitle
              svgIcon {
                sourceUrl
              }
            }
            banner {
              bannerButton
              bannerDescription
              bannerTitle
              bannerImage {
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
              mobileBannerImage {
                mediaDetails {
                  width
                  height
                  file
                }
                sourceUrl
              }
            }
          }
          id
        }
      }
  `;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: "/index-2",
      },
    }),
  });

  //   console.log(json);
  const json = await data.json();
  // console.log(json);
  resp.json(json.data);
};
