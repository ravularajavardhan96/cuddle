import React from "react";
export default function StateDemo() {
  const [count, setCount] = React.useState(0);

  console.log("Component re-rendered");

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </>
  );
}
