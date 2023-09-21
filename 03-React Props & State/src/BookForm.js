import React, { useState } from "react";

const BookForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, year: parseInt(year) };
    props.addBook(newBook);
    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="field">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Author</label>
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Year</label>
            <input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
