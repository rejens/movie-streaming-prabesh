import React from "react";
import { useEffect, useState } from "react";
function Test() {
  const [test, setTest] = useState("");
  const [state, setState] = useState(1);
  useEffect(() => {
    // console.log(state);
    setState((prev) => prev + 1);
  }, []);

  //   console.log(state);
  //   useEffect(() => {
  //     setTest(2);
  //   }, []);
  return <div>Test</div>;
}

export default Test;
