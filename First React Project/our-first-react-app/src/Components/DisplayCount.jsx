import React, { memo } from "react";

const DisplayCount = (props) => {
  console.log(props, "props");
  return <h1>Count {props.count}</h1>;
};

export default memo(DisplayCount);