import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";

import { contentNav } from "../styles/Home.module.css";

const Accordion = ({ title, content, id }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div
            className="float-left py-5 px-2 clear-both w-full border-gray-300 border-2"
            id={"key" + id}
          >
            {title}
            <span className="float-right">{isActive ? "-" : "+"}</span>
          </div>
        </div>
        {isActive && (
          <div className="accordion-content float-left p-5 bg-gray-100" id={id}>
            {content}
          </div>
        )}
      </div>
    </>
  );
};

export default Accordion;
