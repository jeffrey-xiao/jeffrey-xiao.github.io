import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "./link";
import Clear from "./clear";
import colors from "../utils/colors";

const PaginationLink = styled(({ active, children, ...props }) => (
  <Link {...props}>{children}</Link>
))`
  display: inline-block;
  font-size: 20px;
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  color: ${(props) => (props.active ? colors.accent1() : colors.base4())};
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

const NewerPostsLink = styled(PaginationLink)`
  float: left;
`;

const OlderPostsLink = styled(PaginationLink)`
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

const Pagination = (props) => (
  <PaginationDiv>
    <NewerPostsLink to={`${props.pathPrefix}/${props.page - 1}`} active={props.page !== 1}>
      <LargeLinkLabel>
        <FontAwesomeIcon icon="angle-left" />
        &nbsp;Newer Posts
      </LargeLinkLabel>
      <SmallLinkLabel>
        <FontAwesomeIcon icon="angle-left" />
        &nbsp;Newer
      </SmallLinkLabel>
    </NewerPostsLink>
    <OlderPostsLink
      to={`${props.pathPrefix}/${props.page + 1}`}
      active={props.page !== props.numOfPages}
    >
      <LargeLinkLabel>
        Older Posts&nbsp;
        <FontAwesomeIcon icon="angle-right" />
      </LargeLinkLabel>
      <SmallLinkLabel>
        Older&nbsp;
        <FontAwesomeIcon icon="angle-right" />
      </SmallLinkLabel>
    </OlderPostsLink>
    <PaginationLabel>{`${props.page}/${props.numOfPages}`}</PaginationLabel>
    <Clear />
  </PaginationDiv>
);

Pagination.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  numOfPages: PropTypes.number.isRequired,
};

export default Pagination;
