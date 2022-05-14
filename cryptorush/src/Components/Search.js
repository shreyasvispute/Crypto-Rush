import React, { useEffect, useState } from "react";
import { Container, Row, Form, Col, InputGroup, Button } from "react-bootstrap";

const Search = (props) => {
  const [formData, setFormData] = useState("");

  const handleClick = (e) => {
    const key = document.getElementById("searchTerm").value;
    if (key === "") {
      alert("Please enter Pokemon name or id");
    } else if (key && key.trim().length === 0) {
      alert("Name cannot be blank spaces");
    } else {
      props.searchValue(key);
    }
    setFormData("");
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        id="searchTerm"
        type="text"
        className="me-2"
        aria-label="Search"
        name="searchTerm"
        onChange={(e) => {
          setFormData(e.target.value);
        }}
        aria-describedby="SearchNFT"
        placeholder="Enter keyword to search"
      />
      <Button variant="primary" type="submit" onClick={(e) => handleClick(e)}>
        Search
      </Button>
    </InputGroup>
  );
};

export default Search;
