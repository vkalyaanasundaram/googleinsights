export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  resp.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const errorCode = resp.ok ? false : resp.statusCode;

  const QUERY_FOOTER_QRY = `
        query ProductServiceQry {
        productsServices(where: {status: PUBLISH, orderby: {field: TITLE, order: ASC}}) {
            nodes {
            slug
            title
            }
        }
        menuItems(where: {location: HCMS_MENU_FOOTER}) {
            nodes {
            url
            label
            }
        }
   }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_FOOTER_QRY,
    }),
  });

  //   console.log(json);
  const json = await data.json();
  //   console.log(json);
  resp.json(json.data);
};
