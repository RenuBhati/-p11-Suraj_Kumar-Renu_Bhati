import React from "react";

const Book = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>Author:{props.author}</p>
      <p>Year:{props.title}</p>
    </div>
  );
};

export default Book;
