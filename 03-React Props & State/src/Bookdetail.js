import { useState } from "react";
import React from "react";

const Bookdetail = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h3>{props.title}</h3>
      <p>Author:{props.author}</p>
      <p>Year:{props.year}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && <p>Book description or genre goes here...</p>}
    </div>
  );
};

export default Bookdetail;
