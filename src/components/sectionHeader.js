import styled from "styled-components";

import colors from "../utils/colors";

export default styled.h2`
  display: table;
  margin: 0px auto 10px auto;
  padding: 0px 15px 10px 15px;
  border-bottom: 2px solid ${colors.base1()};
  color: ${colors.base1()};
  text-transform: uppercase;
`;
