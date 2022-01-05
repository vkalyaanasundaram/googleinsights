export default async (req, resp) => {
  const {
    query: { slug },
  } = req;
  // console.log(slug);
  let QUERY_SINGLE_POST = {};
  if (slug == "invoice-factoring" || slug == "concierge-services") {
    QUERY_SINGLE_POST = `query ProductPage($id: ID!) {
      productsService(idType: URI, id: $id) {
        invoiceTemplate {
          bannerTitle
          bannerLists {
            bannerList
            listTitle
          }
          bannerDescription
          groupColumnOne {
            groupOneTitle
            groupOneContent
            groupOneImage {
              sourceUrl
            }
          }
          applyNow
          groupColumnTitle
          groupColumnTitleTwo
          groupColumnTwo {
            groupTitle
            groupContent
            groupImage {
              sourceUrl
            }
          }
          invoiceMobileBanner {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
          bannerImage {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }`;
  } else {
    QUERY_SINGLE_POST = `
    query ProductPage($id: ID!) {
        productsService(idType: URI, id: $id) {
          individualProducts {
            banner {
              mediaDetails {
                file
                width
                height
              }
              sourceUrl
            }
            bannerDescription
            title
            mobileBannerImage {
              mediaDetails {
                file
                height
                width
              }
              sourceUrl
            }
            businessLoanDescription
            productsContent
            requirements
            howToApply
            whoShould
            bannerData {
              listTitle
              listItems
            }
            blogHeading
            blogs {
              title
              blogLink
              blogImage {
                sourceUrl
                altText
              }
              description
            }
          }
        }
    }`;
  }
  const data = await fetch(process.env.WORDPRESS_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_POST,
      variables: {
        id: "products-services/" + slug,
      },
    }),
  });

  const errorCode = resp.ok ? false : resp.statusCode;

  const json = await data.json();
  // console.log(json);
  resp.json(json?.data?.productsService);
};
