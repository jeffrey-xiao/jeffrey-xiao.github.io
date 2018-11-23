import styled from 'styled-components';
import { Link } from 'gatsby';

import colors from '../utils/colors';

export default styled(Link)`
  text-decoration: underline;
  color: ${colors.accent1()};
  &:hover {
    background-color: ${colors.accent1(0.1)};
  }
  padding-right: 2px;
  transition: all 0.5s;
  display: inline-block;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 17px;
`;
