import Image from "next/image";
import Link from "next/link";

export default function ProductsBlogs({ data }) {
  return (
    <>
      <div className="container py-10 px-5">
        <div className="xs:w-full md:w-9/12 ">
          <hr />
        </div>
        <div className="float-left my-10">
          <h3>{data?.individualProducts?.blogHeading}</h3>
        </div>
        {data?.individualProducts?.blogs.map((value, key) => (
          <div key={key} className="my-20">
            <>
              {key == 0 ? (
                <div className="xs:w-full md:w-9/12 my-10 ">
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
                <section>
                  <div className="md:flex">
                    <div className="xs:w-full md:w-3/12 blogImg">
                      <div>
                        <Image
                          src={value?.blogImage?.sourceUrl}
                          alt={value?.blogImage?.altText}
                          width={350}
                          height={250}
                        />
                      </div>
                    </div>
                    <div className="xs:w-full md:w-8/12 blogContent">
                      <div>
                        <h4>{value.title}</h4>
                        <p className="text-kapitus text-lg">
                          {value.description}
                        </p>
                      </div>
                      <div>
                        <strong className="text-pink text-lg">
                          <Link href={value?.blogLink}>
                            <a>READ MORE</a>
                          </Link>
                        </strong>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </>
          </div>
        ))}
      </div>
    </>
  );
}
