import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Clear from './clear';
import colors from '../assets/colors';


const PaginationLink = styled(({ active, children, ...props }) => (
  <Link {...props}>{children}</Link>
))`
  display: inline-block;
  font-size: 20px;
  pointer-events: ${props => (props.active ? 'auto' : 'none')};
  cursor: ${props => (props.active ? 'pointer' : 'default')};
  color: ${props => (props.active ? colors.accent1() : colors.base4())};
  text-decoration: none;
  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
  transition: all 0.5s;

  &:hover {
    background-color: ${colors.accent1(0.1)};
  }

  @media only screen and (max-width: 32em) {
    font-size: 16px;
  }
`;

const NewerPostsLink = PaginationLink.extend`
  float: left;
`;

const OlderPostsLink = PaginationLink.extend`
  float: right;
`;

const LargeLinkLabel = styled.span`
  display: inline;
  @media only screen and (max-width: 32em) {
    display: none;
  }
`;

const SmallLinkLabel = styled.span`
  display: none;
  @media only screen and (max-width: 32em) {
    display: inline;
  }
`;

const PaginationLabel = styled.div`
  display: inline-block;
  margin: 0 auto;
  font-size: 27px;
  font-family: "Josefin Sans", sans-serif;
  color: ${colors.accent1()};

  @media only screen and (max-width: 32em) {
    font-size: 22px;
  }
`;

const PaginationDiv = styled.div`
  padding: 0 20px;
  text-align: center !important;
`;

const Pagination = props => (
  <PaginationDiv>
    <NewerPostsLink
      to={`${props.pathPrefix}/${props.page - 1}`}
      active={props.page !== 1}
    >
      <LargeLinkLabel>←Newer Posts</LargeLinkLabel>
      <SmallLinkLabel>←Newer</SmallLinkLabel>
    </NewerPostsLink>
    <OlderPostsLink
      to={`${props.pathPrefix}/${props.page + 1}`}
      active={props.page !== props.numOfPages}
    >
      <LargeLinkLabel>Older Posts→</LargeLinkLabel>
      <SmallLinkLabel>Older→</SmallLinkLabel>
    </OlderPostsLink>
    <PaginationLabel>{props.page}/{props.numOfPages}</PaginationLabel>
    <Clear />
  </PaginationDiv>
);

export default Pagination;
