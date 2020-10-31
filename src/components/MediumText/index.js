import styled from "styled-components";

const MediumText = styled.h3`
  ${({ color }) => color && `color:${color};`};
  display: block;
  font-weight: ${({ weight }) => weight || "600"};
  ${({ letterSpacing }) => letterSpacing && `letter-spacing:${letterSpacing};`}
  text-align: ${({ align }) => align || "left"};
  padding: 5px 0;
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
`;

export default MediumText;
