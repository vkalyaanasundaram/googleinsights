export default async (req, resp) => {
  const {
    query: { slug },
  } = req;

  const ABOUT_QRY = `query AboutUs($id: ID!) {
        page(idType: URI, id: $id) {
          aboutUs {
            aboutDescription
            bannerTitle
            bannerImage {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
            }
            mobileImage {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
            }
            footeContent
            meetTeam {
                profileImage {
                  sourceUrl
                  title
                }
                name
                role
                careerDetails
                linkedin
            }
            ourHistoryRow {
              businessFunded
              companyData
              companyYear
              fundedAmount
              noOfEmployees
              svgIcon {
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
      query: ABOUT_QRY,
      variables: {
        id: "about-us",
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
