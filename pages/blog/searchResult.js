import Head from "next/head";
import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Header from "../../components/Header";
import ReactHtmlParser from "react-html-parser";
import Footer from "../../components/Footer";

export default function SearchResult() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const keyword = router.query.keyword;

  useEffect(() => {
    if (keyword) {
      fetchPost(keyword);
    }
  });
  const handleSearch = (event) => {
    fetchPost(event);
  };
  const fetchPost = async (keyword) => {
    fetch(
      process.env.WORDPRESS_URL +
        `/wp-json/wp/v2/posts?search=${keyword}&per_page=100&status='publish'`
    )
      .then((response) => response.json())
      .then((response) => {
        setPosts(response);
      });
  };
  return (
    <>
      <Header />
      <div className="container m-10">
        <h4>New Search</h4>
        <p>
          If you are not happy with the results below please do another search
        </p>
        <div className="relative searchResultNav">
          <input
            type="text"
            id="search"
            className="border-2 border-gray-300 p-2 w-full"
            onBlur={(e) => handleSearch(e.target.value)}
          />
          <i
            className="fa fa-search"
            aria-hidden="true"
            // onClick={() => setSearchKeyWord(newKeyword)}
          ></i>
        </div>
      </div>

      <div className="container m-10">
        {posts?.map((value, key) => (
          <div key={key}>
            <div className="float-left rounded-full h-10 w-10 mr-5 flex items-center justify-center bg-gray-100 text-kapitus">
              {key + 1}
            </div>
            <h4 className="m-10">{value.title.rendered}</h4>
            <p>
              {ReactHtmlParser(value?.content?.rendered.substring(0, 500))}...
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
