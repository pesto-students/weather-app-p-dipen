import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import mediaSize from "../../constants/MediaSize";

const SearchBar = styled.form`
  position: relative;
  transition: 0.8s 0.5s;
  @media ${mediaSize.laptopL} {
    max-width: 600px;
  }
  @media ${mediaSize.desktop} {
    max-width: 700px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  background-color: #ffffff;
  font-size: 16px;
  padding: 10px 15px 10px 40px;
  color: #c5c5c5;
  transition: 0.2s;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media ${mediaSize.tablet} {
    font-size: 18px;
  }
  @media ${mediaSize.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: 30px;
  }
`;

const SearchIcon = styled.span`
  display: block;
  position: absolute;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  @media ${mediaSize.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${mediaSize.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`;

const SearchBarCity = ({ submit, value, change, onFocus }) => {
  return (
    <>
      <SearchBar onSubmit={submit}>
        <SearchInput
          type="text"
          value={value}
          placeholder="Enter city"
          onChange={change}
          onFocus={() => onFocus(true)}
          onBlur={() => {
            setTimeout(() => onFocus(false), 500);
          }}
        />
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
      </SearchBar>
    </>
  );
};

SearchBarCity.propTypes = {
  submit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

export default SearchBarCity;
