import styled from 'styled-components';

import colors from '../assets/colors';


export default styled.span`
  a {
    font-size: 12px;
    letter-spacing: 2px;
    text-decoration: none;
    color: ${colors.accent1()};
    font-family: "Raleway", sans-serif;
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
  padding: 3px 6px;
  border: 1px solid ${colors.accent3()};
  border-radius: 50px;
  background-color: ${colors.accent3()};
  margin-right: 5px;
  margin-bottom: 7px;
  transition: all 0.5s;
  text-transform: uppercase;
`;