import styled from "styled-components";

import Link from "./link";
import colors from "../utils/colors";

export default styled(Link)`
  text-decoration: none;
  border-bottom: solid 2px ${colors.shade1()};
  color: ${colors.accent1()};
  &:hover {
    background-color: ${colors.accent1(0.1)};
    border-bottom: solid 2px ${colors.accent1()};
  }
  padding-right: 2px;
  transition: all 0.5s;
  display: inline-block;
  white-space: nowrap;
  font-family: "Josefin Sans", sans-serif;
  font-size: 17px;
`;
