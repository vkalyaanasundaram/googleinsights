import Head from "next/head";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Header from "../../components/Header";
import ProductBanner from "../../components/products/IndividualBanner";
import Content from "../../components/products/Content";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// const ProductBanner = dynamic(() =>
//   import("../../components/products/IndividualBanner")
// );
const InvoiceBannerNav = dynamic(() =>
  import("../../components/products/InvoiceBanner")
);
// const Content = dynamic(() => import("../../components/products/Content"), {
//   loading: function ld() {
//     return <p>Loading...</p>;
//   },
//   ssr: false,
// });
const GroupColumn = dynamic(() => import("../../components/products/Group"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const InvoiceGroupColumn = dynamic(
  () => import("../../components/products/InvoiceGroup"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const Requirements = dynamic(
  () => import("../../components/products/Requirements"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const FAQ = dynamic(() => import("../../components/products/FAQ"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Who = dynamic(() => import("../../components/products/Who"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const How = dynamic(() => import("../../components/products/HowToApply"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const ProductsBlogs = dynamic(
  () => import("../../components/products/ProductsBlogs"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const Footer = dynamic(() => import("../../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function ProductPage() {
  const { router, asPath } = useRouter();

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const individualProducts = data?.individualProducts;
  const IndividualBanner = data?.individualProducts;
  const ProductDescription = data?.individualProducts?.businessLoanDescription;
  const ProductContent = data?.individualProducts?.productsContent;
  const RequirementsData = data?.individualProducts?.requirements;
  const HowToApply = data?.individualProducts?.howToApply;
  const WhoShould = data?.individualProducts?.whoShould;

  // invoiceTemplate
  const invoiceTemplate = data?.invoiceTemplate;
  const InvoiceBanner = data?.invoiceTemplate;
  const InvoiceGroupColumnOne = data?.invoiceTemplate?.groupColumnOne;
  const InvoiceGroupColumnTwo = data?.invoiceTemplate?.groupColumnTwo;
  console.log(data);

  if (individualProducts) {
    return (
      <>
        <Head>
          <title>Products We Offer</title>
        </Head>
        <Header />
        <div className="w-full">
          <div className="w-full">
            <ProductBanner data={IndividualBanner} />
          </div>

          <div className="xs:w-full" ref={observe}>
            <Content content={ProductContent} desc={ProductDescription} />
          </div>
          <div className="container">
            <div className="xs:w-full md:w-11/12 ">
              <Requirements data={RequirementsData} />
            </div>
            <div className="xs:w-full md:w-11/12 ">
              <How data={HowToApply} />
            </div>
            <div className="xs:w-full md:w-11/12 ">
              <Who data={WhoShould} />
            </div>
          </div>
          <div className="w-full">
            <GroupColumn />
          </div>
          <div className="container">
            <FAQ />
          </div>
          <section className="container my-10">
            <ProductsBlogs data={data} />
          </section>
          <section className="w-full">{inView && <Footer />}</section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />

        <div className="w-full">
          <InvoiceBannerNav data={InvoiceBanner} />
        </div>
        <div ref={observe}>
          <InvoiceGroupColumn
            columnone={InvoiceGroupColumnOne}
            columnTwo={InvoiceGroupColumnTwo}
            data={data}
          />
        </div>

        <div className="xs:w-full container px-5 m-10 mx-auto">
          <div className="container">
            <h3>READY TO APPLY? </h3>
            <p className="mt-5">
              If invoice factoring seems like the right fit for you, let’s get
              you ready to apply. To begin the application, you will need to be
              able to provide an accounts receivable/payable aging report,
              articles of incorporation or partnership agreement, personal or
              corporate tax return and personal or corporate financial
              statement. Also, be sure to check the credit of your commercial
              clients. Invoice factoring does not pull your credit, but your
              commercial clients’ credit must be in good standing. Additional
              documentation will likely be required as you move through the
              underwriting process. If you’re still not sure that invoice
              factoring is right for you, you can use our financing matching
              tool or give us a call at (800) 780-7133 to speak with one of our
              financing specialists.
            </p>
          </div>
        </div>
        <div className="w-full mt-10" ref={observe}>
          {inView && <Footer />}
        </div>
      </>
    );
  }
}
