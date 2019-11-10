import styled from "styled-components";

import colors from "../utils/colors";

export default styled.div`
  margin: 0 10px 50px 10px;
  border: 0.1px solid ${colors.shade1()};
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px ${colors.shade1()}, 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  padding: 50px;

  @media only screen and (max-width: 64em) {
    padding: 40px;
  }

  @media only screen and (max-width: 60em) {
    padding: 30px;
  }

  @media only screen and (max-width: 48em) {
    padding: 50px;
  }

  @media only screen and (max-width: 40em) {
    padding: 40px;
  }

  @media only screen and (max-width: 32em) {
    padding: 30px;
    margin: 0 0 50px 0;
  }
`;
