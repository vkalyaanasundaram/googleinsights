import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagram,
  FaTwitterSquare,
  FaYoutube,
} from "react-icons/fa";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Header = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { data, error } = useSWR("/api/page/header", fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <div className="xs:hidden md:block border-2 border-white w-full bg-kapitus px-5 py-2 float-left ">
        <div className="container">
          <div className="float-left w-9/12">
            <Link href="https://www.facebook.com/KapitusFinance/">
              <a target="_blank">
                <FaFacebookSquare
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://twitter.com/KapitusFinance">
              <a target="_blank">
                <FaTwitterSquare
                  className="text-white  mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/company/kapitus/">
              <a target="_blank">
                <FaLinkedin
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.instagram.com/kapitus_financing/">
              <a target="_blank">
                <FaInstagram
                  className="text-white mr-2 float-left"
                  size="25px"
                />
              </a>
            </Link>
            <Link href="https://www.youtube.com/channel/UCeCPsIXW-bxrVBQI_ilP_tA">
              <a target="_blank">
                <FaYoutube className="text-white mr-2 float-left" size="25px" />
              </a>
            </Link>
          </div>
          <div className="float-left w-3/12 text-right text-white text-xs">
            Login | Call now: (800) 780-7133
          </div>
        </div>
      </div>
      <div className="bg-kapitus border-2 border-white">
        <nav className="container flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="tracking-tight">
              <Link href="/" passHref>
                <a>
                  <Image
                    src="/Kapitus_Logo_white.webp"
                    width={250}
                    height={100}
                    alt="Kapitus"
                    className="cursor-pointer"
                  />
                </a>
              </Link>
            </span>
          </div>
          <div className="float-left block lg:hidden">
            <button
              onClick={() => setMenuVisibility(!isMenuVisible)}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuVisible ? "max-h-full" : "h-0"
            } overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-sm lg:flex-grow">
              {data?.menuItems?.edges.map(({ node }, index) => (
                <span
                  className="text-white text-center text-lg block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                  key={index}
                >
                  <Link
                    href={node.url}
                    passHref
                    prefetch={false}
                    className="text-white"
                  >
                    <a>{node.label}</a>
                  </Link>
                </span>
              ))}
            </div>
            <div className="bg-green px-10 py-3 text-kapitus font-semibold">
              <Link href="/fast-application/" passHref>
                APPLY NOW
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
