import { useState, useEffect } from "react";
import useInView from "react-cool-inview";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const ContactUs = (data) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "kapitus-map",
      style: "mapbox://styles/kapitus/cjtyljmho3vok1fntmnu0c8hq",
      center: [-1.98387980000001, 30.75704],
      zoom: 2,
    });
  });

  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

  return (
      <div id="kapitus-map" className="w-full" style={{ height: 500 }}></div>
  );
};

export default ContactUs;
