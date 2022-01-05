export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const QUERY_SUCCESS_STORIES = `
    query SuccessStories($id: ID!) {
        page(idType: URI, id: $id) {
          successStoriesACF {
            pageLargeSlider {
              sliderContent
              sliderImage {
                sourceUrl
                sizes(size: LARGE)
                mediaDetails {
                  height
                  width
                }
              }
            }
            suggestedResources {
              svgIcon {
                sourceUrl
              }
              link
              resourceContent
            } 
            carouselSlider {
              carouselContent
              carouselImage {
                sourceUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
            footerContent
            
          }
        }
    }`;

  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SUCCESS_STORIES,
      variables: {
        id: "success-stories",
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
