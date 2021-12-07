export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_MEDIA_CENTER = `
    query MediaCenter($id: ID!) {
        page(idType: URI, id: $id) {
          mediaCenter {
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
            mobileBanner {
              mediaDetails {
                width
                height
                file
              }
              sourceUrl
            }
            media {
              mediaTitle {
              sourceUrl
              mediaDetails {
                width
                height
              }
            }
            mediaMouseOverText
            }
            twoColumn {
              columnTitle
              columnContent
              callUs {
                sourceUrl
              }
            }
          }
        }
        pressCoverages(first: 100) {
            nodes {
                link
                title
                slug
            }
        }
        pressReleases(first: 40) {
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
        id: "media-center",
      },
    }),
  });
  // if (resp.status(500)) {
  //   // resp.status(500).json({ message: `User with id not found.` });
  //   resp.redirect("./500");
  // } else {
  //   console.log(json);
  const json = await data.json();
  // console.log(json);
  resp.json(json?.data);
  // }
};
