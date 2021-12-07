import Image from "next/image";
import Link from "next/link";

export default function ProductsBlogs({ data }) {
  return (
    <>
      <div className="container py-10 px-5 ml-20">
        <div className="w-full">
          <h3>{data?.individualProducts?.blogHeading}</h3>
        </div>
        {data?.individualProducts?.blogs.map((value, key) => (
          <div key={key} className="my-20">
            <>
              {key == 0 ? (
                <div className="w-full">
                  <h3 className="my-10">{value?.blogHeading}</h3>
                  <Image
                    src={value?.blogImage?.sourceUrl}
                    alt={value?.blogImage?.altText}
                    width={1000}
                    height={650}
                  />
                  <h4>{value.title}</h4>
                  <p className="text-kapitus text-lg">{value.description}</p>
                </div>
              ) : (
                <div className="w-full float-left clear-both my-5">
                  <div className="xs: w-full float-left md: w-1/4 float-left">
                    <Image
                      src={value?.blogImage?.sourceUrl}
                      alt={value?.blogImage?.altText}
                      width={450}
                      height={350}
                    />
                  </div>
                  <div className="xs: w-full float-left md: w-2/4 mx-5 float-left">
                    <div className="float-left">
                      <h4>{value.title}</h4>
                      <p className="text-kapitus text-lg">
                        {value.description}
                      </p>
                    </div>
                    <div className="float-left">
                      <strong className="text-pink text-lg">
                        <Link href={value?.blogLink}>
                          <a>READ MORE</a>
                        </Link>
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
}
