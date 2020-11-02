import styled from "styled-components";
import mediaSize from "../../constants/MediaSize";

const SmallText = styled.h4`
  color: ${({ color }) => color || "inherit"};
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
  `}// @media ${mediaSize.tablet} {
  //   font-size: ${({ fontSize }) =>
    fontSize ||
    "20px"};
  // }
  // @media ${mediaSize.laptop} {
  //   font-size: ${({
    fontSize,
  }) =>
    fontSize ||
    "23px"};
  // }
  // @media ${mediaSize.laptopL} {
  //   font-size: ${({
    fontSize,
  }) => fontSize || "26px"};
  // }
`;

export default SmallText;
