import styled from "styled-components";

import colors from "../utils/colors";

export default styled.span`
  a {
    font-size: 11px;
    letter-spacing: 1.5px;
    text-decoration: none;
    color: ${colors.accent1()};
    font-family: "Josefin Sans", sans-serif;
    font-weight: bold;
  }

  &:hover {
    a {
      color: white;
    }
    background-color: ${colors.accent1()};
    border: 1px solid ${colors.accent1()};
  }

  display: inline-flex;
  align-items: center;
  padding: 5px 8px 0px 8px;
  border: 1px solid ${colors.accent3()};
  border-radius: 50px;
  background-color: ${colors.accent3()};
  margin-right: 5px;
  margin-bottom: 7px;
  transition: all 0.5s;
  text-transform: uppercase;
`;
