import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import mediaSize from '../../constants/MediaSize';
import SuggestionBox from '../SuggestionBox';
const SearchBar = styled.form`
  position: relative;
  transition: 0.8s 0.5s;
  display: flex;
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
  border-radius: ${({ suggestionsList, focus, value, isFetching }) =>
    value !== '' && (suggestionsList > 0 || isFetching) && focus
      ? '20px 20px 0px 0px'
      : '20px'};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  &:focus {
    color: #191919;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    outline: none;
  }
  -webkit-transition: background 1s, border-radius 1s;
  transition: background 1s, border-radius 1s;
  @media ${mediaSize.tablet} {
    font-size: 18px;
  }
  @media ${mediaSize.laptop} {
    padding: 15px 20px 15px 45px;
    border-radius: ${({ suggestionsList, focus, value }) =>
      value !== '' && suggestionsList > 0 && focus
        ? '30px 30px 0px 0px'
        : '30px'};
  }
`;

const SearchIcon = styled.button`
  display: block;
  position: absolute;
  border: none;
  background: none;
  top: 50%;
  left: 22px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #c5c5c5;
  cursor: pointer;
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
  &:focus {
    outline: none;
  }
`;

const SearchBarCity = ({
  submit,
  value,
  change,
  onFocus,
  focus,
  suggestions = [],
  handleSelectSuggestions,
  isFetching,
}) => {
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
          suggestionsList={suggestions.length}
          focus={focus}
          isFetching={isFetching}
        />
        <SearchIcon type="submit" value="Submit">
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        {value !== '' && focus && (suggestions.length > 0 || isFetching) && (
          <SuggestionBox
            suggestions={suggestions}
            onChange={handleSelectSuggestions}
            isFetching={isFetching}
          />
        )}
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
