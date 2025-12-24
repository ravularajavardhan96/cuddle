import React from "react";
export default function RefDemo() {
  const countRef = React.useRef(0);

  console.log("Component rendered");

  return (
    <>
      <p>Count: {countRef.current}</p>
      <button onClick={() => {
        countRef.current += 1;
        console.log("Ref value:", countRef.current);
      }}>
        Increase
      </button>
    </>
  );
}
