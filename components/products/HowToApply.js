import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { contentNav } from "../../styles/Home.module.css";

import { useRouter } from "next/router";

const HowToApply = ({ data }) => {
  //   console.log(data)
  return (
    <>
      <div id="HowApply">
        <div className="px-5 my-20">{ReactHtmlParser(data)}</div>
      </div>
    </>
  );
};

export default HowToApply;
