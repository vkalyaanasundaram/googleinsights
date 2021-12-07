import Head from "next/head";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Router, { useRouter } from "next/router";

export default function SearchBlogs() {
  const [setSearchKeyWord, newKeyword] = useState();
  const { pathname } = Router;

  const fetchData = async (keyword) => {
    console.log(keyword);
    const req = await fetch(
      process.env.WORDPRESS_URL +
        `/wp-json/wp/v2/posts?search=${keyword}&results=100&status='publish'`
    );
    const newData = await req.json();
    console.log(newData);
  };

  const handleSearch = (event) => {
    fetchData(event);

    Router.push(`./blog/searchResult?keyword=${event}`);
  };
  return (
    <>
      <div className="mx-5 my-10">
        <div className="relative">
          <input
            type="text"
            name="searchIco"
            id="searchIco"
            className="border-2 border-gray-300 p-2 w-10/12"
            onBlur={(e) => handleSearch(e.target.value)}
          />
          <i
            className="fa fa-search"
            aria-hidden="true"
            // onClick={() => setSearchKeyWord(newKeyword)}
          ></i>
        </div>
      </div>
    </>
  );
}
