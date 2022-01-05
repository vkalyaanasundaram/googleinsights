export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_PRODUCTS = `
    query SinglePage($id: ID!) {
        page(idType: URI, id: $id) {
          productsAcf {
            mobileBannerImage {
              mediaDetails {
                width
                height
                file
              }
              sourceUrl
            }
            bannerListItems {
              title
              listsItems
            }
            pageBannerDescription
            pageBannerTitle
            ourGoal
            productsCards {
              cardContent
              cardTitle
              svgIcon {
                sourceUrl
              }
              cardButton
              cardSlug
            }
            getStartedToday
            pageBanner {
              mediaDetails {
                width
                height
                file
              }
              sourceUrl
            }
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
      query: QUERY_PRODUCTS,
      variables: {
        id: "products-we-offer",
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
