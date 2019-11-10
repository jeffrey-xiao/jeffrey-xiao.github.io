import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";

import ProjectCard from "../components/projectCard";
import colors from "../utils/colors";

const ProjectsBody = styled.div`
  span.emphasis {
    color: ${colors.accent1()};
    transition: all 0.5s;
  }
  margin-bottom: 40px;
`;

const ProjectCardWrapper = styled.div`
  box-sizing: border-box;
  padding: 20px;
  width: 33.33%;
  display: flex;

  @media only screen and (max-width: 60em) {
    width: 50%;
  }

  @media only screen and (max-width: 40em) {
    width: 100%;
  }
`;

const ProjectCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
`;

class ProjectsPage extends React.Component {
  componentDidMount() {
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = "opacity 1000ms ease-out";
      this.node.style.opacity = 1;
    });
  }

  render() {
    const projectCards = [];

    this.props.data.allProjectsJson.edges.forEach((project) => {
      projectCards.push(
        <ProjectCardWrapper key={project.node.title}>
          <ProjectCard
            title={project.node.title}
            description={project.node.description}
            src={project.node.src}
            url={project.node.url}
          />
        </ProjectCardWrapper>,
      );
    });

    return (
      <ProjectsBody
        ref={(node) => {
          this.node = node;
        }}
      >
        <Helmet>
          <title>Projects - Jeffrey Xiao</title>
        </Helmet>
        <ProjectCards>{projectCards}</ProjectCards>
      </ProjectsBody>
    );
  }
}

ProjectsPage.propTypes = {
  data: PropTypes.shape({
    allProjectsJson: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            url: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            src: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProjectsPage;
export const pageQuery = graphql`
  {
    allProjectsJson {
      edges {
        node {
          url
          description
          title
          src
        }
      }
    }
  }
`;
