import React, { useEffect, useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

const Search = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };

  return (
    <Form
      className="d-flex"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="formname"
    >
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        name="searchTerm"
        onChange={handleChange}
      />
    </Form>
  );
};

export default Search;
