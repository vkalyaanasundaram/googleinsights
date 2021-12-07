export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_SINGLE_POST = `
    query SinglePage($id: ID!) {
        page(idType: URI, id: $id) {
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
                fieldGroupName
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
            
            financeSolution
          }
          carouselAcf {
            carouselData {
              carouselContent
              carouselImage {
                sourceUrl
              }
            }
          }
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: "problems-we-solve",
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
  resp.json(json?.data?.page);
  // }
};
