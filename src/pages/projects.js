import React from 'react';
import { Helmet } from 'react-helmet';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import ProjectCard from '../components/projectCard';
import colors from '../assets/colors';


const BREAKPOINTS = [32, 52];

const ProjectsBody = styled.div`
  span.emphasis {
    color: ${colors.accent1()};
  }

  margin-bottom: 40px;
`;

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);

    this.heights = [];
    this.sent = [];
    for (let i = 0; i < this.props.data.allProjectsJson.edges.length; i++) {
      this.heights.push(0);
      this.sent.push(1);
    }

    this.state = {
      numCols: 1,
      heights: this.heights.slice(),
    };

    this.updateNumCols = this.updateNumCols.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
  }

  componentDidMount() {
    const elem = ReactDOM.findDOMNode(this);
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 1000ms ease-out';
      elem.style.opacity = 1;
    });

    this.updateNumCols();
    window.addEventListener('resize', this.updateNumCols);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateNumCols);
  }

  updateNumCols() {
    let numCols = 1;
    for (let i = 0; i < BREAKPOINTS.length; i++) {
      if (window.innerWidth >= BREAKPOINTS[i] * 16) {
        numCols++;
      }
    }

    for (let i = 0; i < this.sent.length; i++) {
      this.sent[i] -= 2;
    }

    this.setState({
      numCols,
    });
  }

  updateHeight(index, height) {
    this.heights[index] = height;
    this.sent[index] += 1;

    let shouldSend = true;
    for (let i = 0; i < this.sent.length; i++) {
      shouldSend = shouldSend && (this.sent[i] === 2);
    }

    if (shouldSend) {
      this.setState({ heights: this.heights });
    }
  }

  render() {
    const projectCards = [];

    const maxHeights = [];
    for (let i = 0; i < this.state.heights.length; i++) {
      maxHeights.push(0);

      const row = Math.floor(i / this.state.numCols);
      maxHeights[row] = Math.max(maxHeights[row], this.state.heights[i]);
    }

    this.props.data.allProjectsJson.edges.forEach((project, index) => {
      const row = Math.floor(index / this.state.numCols);
      projectCards.push(
        <ProjectCard
          key={project.node.title}
          index={index}
          breakpoints={BREAKPOINTS}
          title={project.node.title}
          description={project.node.description}
          src={project.node.src}
          height={maxHeights[row]}
          url={project.node.url}
          updateHeight={this.updateHeight}
        />,
      );
    });

    return (
      <ProjectsBody>
        <Helmet>
          <title>Projects - Jeffrey Xiao</title>
        </Helmet>
        {projectCards}
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
