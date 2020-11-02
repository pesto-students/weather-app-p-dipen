import React from 'react';
import styled from 'styled-components';
import mediaSize from '../constants/MediaSize';

const Options = styled.div`
  z-index: 1;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 90%;
  background: #ffff;
  width: 100%;
  border-radius: 0px 0px 20px 20px;
  padding-bottom: 19px;
  @media ${mediaSize.mobileL} {
    border-radius: 0px 0px 30px 30px;
    margin-top: 5px;
  }
`;
const Option = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  &:hover {
    background: #a7a1a182;
  }
`;

export default function SuggestionBox({ suggestions, onChange }) {
  return (
    <Options>
      {suggestions &&
        [...new Set(suggestions)].map((suggestion, key) => (
          <Option onClick={() => onChange(suggestion)} key={key}>
            {suggestion}
          </Option>
        ))}
    </Options>
  );
}
