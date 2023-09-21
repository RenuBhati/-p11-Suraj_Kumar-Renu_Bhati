import React, { Component } from "react";
import Book from "./Book";
import WithLogging from "./WithLogging";
import BookForm from "./BookForm";

class BookList extends Component {
  state = {
    books: [
      { title: "Book 1", author: "Author 1", year: 2020 },
      { title: "Book 2", author: "Author 2", year: 2018 },
      { title: "Book 3", author: "Author 3", year: 2022 },
    ],
  };

  addBook = (book) => {
    this.setState((prevState) => ({
      books: [...prevState.books, book],
    }));
  };

  deleteBook = (index) => {
    const newBooks = [...this.state.books];
    newBooks.splice(index, 1);
    this.setState({ books: newBooks });
  };

  render() {
    return (
      <div>
        <BookForm addBook={this.addBook} />
        <ul>
          {this.state.books.length ? (
            this.state.books.map((book, index) => (
              <li key={index}>
                <Book
                  title={book.title}
                  author={book.author}
                  year={book.year}
                />
                <button onClick={() => this.deleteBook(index)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No books available</p>
          )}
        </ul>
      </div>
    );
  }
}

export default WithLogging(BookList);
