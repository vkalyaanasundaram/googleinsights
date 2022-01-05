import React, { CSSProperties } from "react";

const Center = ({
  children,
  backgroundColor = "rgb(255,255,255)",
  id,
  height = "100vh",
}) => {
  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    backgroundColor: backgroundColor,
  };

  return (
    <div id={id} style={styles}>
      {children}
    </div>
  );
};

export default Center;
