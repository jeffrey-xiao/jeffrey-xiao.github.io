import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import ProjectCard from '../components/projectCard';
import colors from '../assets/colors';


const ProjectsBody = styled.div`
  span.emphasis {
    color: ${colors.accent1()};
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
    const elem = ReactDOM.findDOMNode(this);
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 1000ms ease-out';
      elem.style.opacity = 1;
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
      <ProjectsBody>
        <Helmet>
          <title>Projects - Jeffrey Xiao</title>
        </Helmet>
        <ProjectCards>
          {projectCards}
        </ProjectCards>
      </ProjectsBody>
    );
  }
}

export default ProjectsPage;
export const pageQuery = graphql`
  query ProjectsPageQuery {
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
