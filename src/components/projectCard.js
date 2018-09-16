import React from 'react';
import { Grid } from 'grid-styled';
import styled, { ThemeProvider } from 'styled-components';
import Measure from 'react-measure';

import colors from '../assets/colors';


const ProjectWrapper = styled.div`
  &:hover .emphasis {
    background-color: ${colors.accent1(0.1)};
  }
  border: 0.1px solid ${colors.shade1()};
  border-radius: 7px;
  box-shadow: inset inset 0 0 0 1px ${colors.shade1()}; 0 5px 15px -5px rgba(0;0;0;.1);
  padding: 20px;
  min-height: ${props => props.height + 32}px;
`;
const ProjectImage = styled.img`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  transition: transform 0.5s;
  height: 100%;
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
`;

const ProjectDescription = styled.p`
  margin-top: 7px;
  text-align: center;
  .emphasis {
    transition: 0.5s all;
  }
`;


class ImgWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.sendHeights = this.sendHeights.bind(this);
  }

  componentDidMount() {
    this.sendHeights();
    window.addEventListener('resize', this.sendHeights);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sendHeights);
  }

  sendHeights() {
    this.props.updateHeights(this.state.height, 0);
  }

  render() {
    return (
      <Measure
        onResize={(contentRect) => {
          if (this.state.height === 0 && contentRect.entry.height !== 0) {
            this.props.updateHeights(contentRect.entry.height, 0);
          }
          this.setState({ height: contentRect.entry.height });
        }}
      >
        {({ measureRef }) =>
          (<div ref={measureRef}>
            <ProjectImageLink href={this.props.url}>
              <ProjectImage src={__PATH_PREFIX__ + this.props.src} />
            </ProjectImageLink>
          </div>)
        }
      </Measure>
    );
  }
}

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
    this.sendHeights = this.sendHeights.bind(this);
  }

  componentDidMount() {
    this.sendHeights();
    window.addEventListener('resize', this.sendHeights);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sendHeights);
  }

  sendHeights() {
    if (this.state.height) {
      this.props.updateHeights(0, this.state.height);
    }
  }

  render() {
    return (
      <Measure
        onResize={(contentRect) => {
          if (this.state.height === 0 && contentRect.entry.height !== 0) {
            this.props.updateHeights(0, contentRect.entry.height);
          }
          this.setState({ height: contentRect.entry.height });
        }}
      >
        {({ measureRef }) =>
          (<div ref={measureRef}>
            <ProjectTitle>{this.props.title}</ProjectTitle>
            <ProjectDescription dangerouslySetInnerHTML={{ __html: this.props.description }} />
          </div>)
        }
      </Measure>
    );
  }
}

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.imgHeight = 0;
    this.descriptionHeight = 0;
    this.updateHeights = this.updateHeights.bind(this);
  }

  updateHeights(imgHeight, descriptionHeight) {
    if (imgHeight) {
      this.imgHeight = imgHeight;
    }

    if (descriptionHeight) {
      this.descriptionHeight = descriptionHeight;
    }

    this.props.updateHeight(this.props.index, this.imgHeight + this.descriptionHeight);
  }

  render() {
    return (
      <ThemeProvider
        theme={{ breakpoints: this.props.breakpoints }}
      >
        <Grid width={[1 / 1, 1 / 2, 1 / 3]} px={[0, 5, 10]} pt={20} pb={10}>
          <ProjectWrapper height={this.props.height}>
            <ImgWrapper
              src={this.props.src}
              url={this.props.url}
              index={this.props.index}
              updateHeights={this.updateHeights}
            />
            <ProjectInfo
              title={this.props.title}
              description={this.props.description}
              index={this.props.index}
              updateHeights={this.updateHeights}
            />
          </ProjectWrapper>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default ProjectCard;
