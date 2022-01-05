export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_MEDIA_CENTER = `
    query PressCoverage {
        pressCoverages(first: 100) {
            nodes {
                link
                title
                slug
            }
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_MEDIA_CENTER,
      variables: {
        id: "pressCoverages",
      },
    }),
  });
  // if (resp.status(500)) {
  //   // resp.status(500).json({ message: `User with id not found.` });
  //   resp.redirect("./500");
  // } else {
  //   console.log(json);
  const json = await data.json();
  //   console.log(json);
  resp.json(json?.data?.pressCoverages);
  // }
};
