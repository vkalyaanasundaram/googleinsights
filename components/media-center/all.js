import Link from "next/link";
import Image from "next/image";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export default function AllEvents({ data }) {
  return (
    <>
      <div className="w-full p-10 grid grid-flow-col grid-cols-5 gap-0 border-2">
        {/* {data?.pressCoverages?.nodes.map((value, key) => (
          <div key={key}>
            <Flippy
              flipOnHover={true} // default false
              flipOnClick={true} // default false
              flipDirection="horizontal" // horizontal or vertical
            >
              <FrontSide
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                  textAlign: "center",
                  height: "250px",
                }}
                className="kapitus-blue"
              >
                <Image
                  src={value?.mediaTitle?.sourceUrl}
                  width={value?.mediaTitle?.mediaDetails?.width}
                  height={value?.mediaTitle?.mediaDetails?.height}
                  alt=""
                />
              </FrontSide>
              <BackSide
                style={{
                  display: "table-cell",
                  verticalAlign: "middle",
                  textAlign: "center",
                  height: "250px",
                  backgroundColor: "#00395d",
                  color: "#fff",
                }}
                className="kapitus-blue"
              >
                {value?.title}
              </BackSide>
            </Flippy>
          </div>
        ))} */}
      </div>
      <div className="xs:p-5 w-full md:p-10">
        {/* {alert("234")} */}

        <div className="xs:gird-col-1 md:grid grid-cols-4 gap-1 ">
          {data?.pressCoverages?.nodes?.map((value, key) => (
            <Link href={value?.link} key={key}>
              <a target="_blank">
                <div className="shadow-md py-20 px-2 border-2 text-kapitus h-5/6  bg-white">
                  {value?.title}
                </div>
              </a>
            </Link>
          ))}

          {data?.pressReleases?.nodes?.map((value, key) => (
            <Link href={value?.link} key={key}>
              <a target="_blank">
                <div className="shadow-md py-20 px-2 border-2 text-kapitus h-5/6  bg-white">
                  {value?.title}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
