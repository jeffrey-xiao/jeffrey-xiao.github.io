import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Section from "./section";
import SectionHeader from "./sectionHeader";
import UnbrokenStyledLink from "./unbrokenStyledLink";

const TagBody = styled.div`
  width: 60%;
  display: inline-block;

  @media only screen and (max-width: 64em) {
    width: 80%;
  }
`;

const TagSection = styled(Section)`
  text-align: center !important;
  padding-left: 0;
  padding-right: 0;
`;

const TagLink = styled(UnbrokenStyledLink)`
  text-transform: capitalize;
  margin-right: 10px;
  margin-top: 5px;
`;

const TagList = (props) => {
  const tagLinks = [];
  const { tagCount } = props;

  Array.from(tagCount.entries()).forEach(([key, value]) => {
    tagLinks.push(
      <TagLink key={key} to={`/blog/tags/${key.toLowerCase().replace(/ /g, "-")}`}>
        {`${key} (${value})`}
      </TagLink>,
    );
  });

  // special padding and width for taglist
  return (
    <TagSection>
      <SectionHeader>Tags</SectionHeader>
      <TagBody>{tagLinks}</TagBody>
    </TagSection>
  );
};

TagList.propTypes = {
  tagCount: PropTypes.instanceOf(Map).isRequired,
};

export default TagList;
