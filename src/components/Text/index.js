import styled from "styled-components";
import mediaSize from "../../constants/MediaSize";

const Text = styled.span`
  color: ${({ color }) => color || "inherit"};
  display: block;
  font-size: ${({ fontSize }) => fontSize || "0.75rem"};
  text-align: ${({ align }) => align || "left"};
  ${({ firstToUpperCase }) =>
    firstToUpperCase &&
    `
  &:first-letter {
    text-transform: uppercase;
  }
  `}
  @media ${mediaSize.tablet} {
    font-size: ${({ fontSize }) => fontSize || "1rem"};
  }
`;

export default Text;
