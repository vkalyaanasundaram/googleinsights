import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import { contentNav } from "../../styles/Home.module.css";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import { useRouter } from "next/router";

const Requirements = ({ data }) => {
  //   console.log(data)
  return (
    <>
      <div id="Requirement">
        <div className="container py-10 px-5">{ReactHtmlParser(data)}</div>
        <div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Requirements;
