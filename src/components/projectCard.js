import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const ProjectWrapper = styled.div`
  box-sizing: border-box;
  &:hover .emphasis {
    background-color: ${colors.accent1(0.1)};
  }
  border: 0.1px solid ${colors.shade1()};
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px ${colors.shade1()}, 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProjectImage = styled.img`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  transition: transform 0.5s;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const ProjectImageLink = styled.a`
  &:hover > img {
    transform: translateX(-50%) scale(1.1);
  }
  position: relative;
  display: inline-block;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
  border: 2px solid ${colors.shade1()};
  border-radius: 7px;
`;

const ProjectTitle = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  margin: 5px;
  color: ${colors.base1()};
`;

const ProjectDescription = styled.p`
  margin-top: 7px;
  text-align: center;
  color: ${colors.base2()};
`;

const ProjectCard = (props) => (
  <ProjectWrapper>
    <ProjectImageLink href={props.url}>
      <ProjectImage src={__PATH_PREFIX__ + props.src} />
    </ProjectImageLink>
    <ProjectTitle>{props.title}</ProjectTitle>
    <ProjectDescription dangerouslySetInnerHTML={{ __html: props.description }} />
  </ProjectWrapper>
);

ProjectCard.propTypes = {
  url: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectCard;
