import React from "react";
import Bookdetail from "./Bookdetail";

class Book extends React.PureComponent {
  render() {
    return (
      <Bookdetail
        title={this.props.title}
        author={this.props.author}
        year={this.props.year}
      />
    );
  }
}

export default Book;
