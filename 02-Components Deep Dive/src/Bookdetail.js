import React from "react";

const Bookdetail = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>Author:{props.author}</p>
      <p>Year:{props.title}</p>
    </div>
  );
};

export default Bookdetail;
