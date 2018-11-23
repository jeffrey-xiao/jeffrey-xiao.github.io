import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Clear from '../components/clear';
import colors from '../utils/colors';

const ResumeBody = styled.div`
  span.emphasis {
    color: ${colors.accent1()};
  }
  a {
    color: ${colors.accent1()};
    transition: all 0.5s;
    &:hover {
      background-color: ${colors.accent1(0.1)};
    }
  }
  p {
    color: ${colors.base2()};
  }
  margin-bottom: 25px;
`;

const ResumeLeftColumn = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 60%;
  float: left;
  padding: 0 30px 30px 0;

  @media only screen and (max-width: 56em) {
    width: 100%;
    padding: 0;
  }
`;

const ResumeRightColumn = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 40%;
  float: right;
  padding: 0 0 30px 30px;

  @media only screen and (max-width: 56em) {
    width: 100%;
    padding: 0 0 30px 0;
  }
`;

const BaseSpan = styled.span`
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  margin-bottom: 4px;
  @media only screen and (max-width: 32em) {
    width: 100%;
    margin-top: 0;
  }
`;

const LeftHeaderSpan = styled(BaseSpan)`
  float: left;
  color: ${colors.accent1()};
`;

const LeftSubheaderSpan = styled(BaseSpan)`
  float: left;
  color: ${colors.accent2()} !important;

  a {
    color: ${colors.accent2()} !important;
  }
`;

const RightHeaderSpan = styled(BaseSpan)`
  float: right;
  color: ${colors.base1()};
`;

const RightSubheaderSpan = styled(BaseSpan)`
  float: right;
  color: ${colors.base3()};
`;

const LeftSubsubheaderSpan = styled(RightHeaderSpan)`
  float: left;
`;

const Description = styled.ul`
  margin: 4px 0 0 -14px;
  font-family: 'Open Sans', sans-serif;
  list-style-type: none;
  color: ${colors.base2()};

  li:before {
    content: '–';
    position: absolute;
    margin-left: -18px;
  }
`;

const getPoints = (points) =>
  points.map((point) => <li key={point} dangerouslySetInnerHTML={{ __html: point }} />);

const ResumeSection = (props) => {
  const descriptionPoints = getPoints(props.description);

  return (
    <div style={{ paddingBottom: '15px' }}>
      <div>
        <LeftHeaderSpan>{props.leftHeader}</LeftHeaderSpan>
        <RightHeaderSpan>{props.rightHeader}</RightHeaderSpan>
        <Clear />
      </div>
      <div>
        <LeftSubheaderSpan dangerouslySetInnerHTML={{ __html: props.leftSubheader }} />
        <RightSubheaderSpan>{props.rightSubheader}</RightSubheaderSpan>
        <Clear />
      </div>
      <Description>{descriptionPoints}</Description>
    </div>
  );
};

const EducationSection = (props) => {
  const descriptionPoints = getPoints(props.description);

  return (
    <div style={{ paddingBottom: '15px' }}>
      <div>
        <LeftHeaderSpan>{props.entity}</LeftHeaderSpan>
        <Clear />
      </div>
      <div>
        <LeftSubheaderSpan dangerouslySetInnerHTML={{ __html: props.subEntity }} />
        <Clear />
      </div>
      <div>
        <LeftSubsubheaderSpan dangerouslySetInnerHTML={{ __html: props.locationTime }} />
        <Clear />
      </div>
      <Description>{descriptionPoints}</Description>
    </div>
  );
};

const getExperienceSectionComponent = (entry, key) => (
  <ResumeSection
    key={key}
    leftHeader={entry.node.entity}
    leftSubheader={entry.node.subEntity}
    rightHeader={entry.node.location}
    rightSubheader={entry.node.time}
    description={entry.node.description}
  />
);

const getProjectSectionComponent = (entry, key) => (
  <ResumeSection
    key={key}
    leftHeader={entry.node.entity}
    leftSubheader={entry.node.subEntity}
    rightHeader={entry.node.category}
    rightSubheader={entry.node.tags}
    description={entry.node.description}
  />
);

const getEducationSectionComponent = (entry, key) => (
  <EducationSection
    key={key}
    entity={entry.node.entity}
    subEntity={entry.node.subEntity}
    locationTime={entry.node.locationTime}
    description={entry.node.description}
  />
);

const ResumeLink = styled.a`
  text-decoration: none;
  font-style: italic;
  font-family: 'Open Sans', sans-serif;
`;

const LinksSection = () => (
  <div>
    <div>
      <ResumeLink href="mailto:jeffrey.xiao@uwaterloo.ca">
        <FontAwesomeIcon icon="envelope" /> jeffrey.xiao@waterloo.ca
      </ResumeLink>
    </div>
    <div>
      <ResumeLink href="https://www.github.com/jeffrey-xiao">
        <FontAwesomeIcon icon={['fab', 'github']} /> github.com/jeffrey-xiao
      </ResumeLink>
    </div>
    <div>
      <ResumeLink href="https://www.linkedin.com/in/jeffreyxiao">
        <FontAwesomeIcon icon={['fab', 'linkedin']} /> linkedin.com/in/jeffrey-xiao
      </ResumeLink>
    </div>
    <div>
      <ResumeLink href="https://devpost.com/jeffreyxiao">
        <FontAwesomeIcon icon="link" /> devpost.com/jeffreyxiao
      </ResumeLink>
    </div>
    <div>
      <ResumeLink href="https://cdn.jsdelivr.net/gh/jeffrey-xiao/resume@44d2fa668e1dc88e711ca2225af05986fd89a998/resume.pdf">
        <FontAwesomeIcon icon="file-pdf" /> PDF Version of Resume
      </ResumeLink>
    </div>
  </div>
);

const AwardDate = styled.p`
  display: inline-block;
  width: 40px;
  vertical-align: top;
  padding-right: 20px;
  font-family: 'Open Sans', sans-serif;
  margin: 4px 0;
  color: ${colors.base1()};
`;

const AwardTitle = styled.p`
  display: inline-block;
  width: calc(100% - 60px);
  font-family: 'Open Sans', sans-serif;
  font-weight: 100;
  margin: 4px 0;
  color: ${colors.base1()};
`;

const AwardsSection = (props) => {
  const awards = [];

  props.awards.forEach((award) => {
    awards.push(
      <div key={award.node.title}>
        <AwardDate>{award.node.date}</AwardDate>
        <AwardTitle>{award.node.title}</AwardTitle>
      </div>,
    );
  });

  return <div>{awards}</div>;
};

const SectionHeader = styled.h1`
  margin-top: 30px;
  margin-bottom: 8px;
  text-transform: uppercase;
  color: ${colors.base1()};
`;

const SectionSubheader = styled.h2`
  margin-top: 12px;
  color: ${colors.accent2()};
  margin-bottom: 0;
  font-weight: normal;
  text-transform: uppercase;
  font-size: 20px;
`;

class ResumePage extends React.Component {
  componentDidMount() {
    this.node.style.opacity = 0;
    window.requestAnimationFrame(() => {
      this.node.style.transition = 'opacity 1000ms ease-out';
      this.node.style.opacity = 1;
    });
  }

  render() {
    const experienceSections = [];
    const projectSections = [];
    const skillSections = [];
    const educationSections = [];
    const certifications = getPoints(
      this.props.data.allCertificationEntriesJson.edges.map(
        (entry) => entry.node.certificationName,
      ),
    );
    const interests = getPoints(
      this.props.data.allInterestEntriesJson.edges.map((entry) => entry.node.interestName),
    );

    this.props.data.allEducationEntriesJson.edges.forEach((entry) => {
      educationSections.push(getEducationSectionComponent(entry, entry.node.entity));
    });

    this.props.data.allExperienceEntriesJson.edges.forEach((entry) => {
      experienceSections.push(getExperienceSectionComponent(entry, entry.node.entity));
    });

    this.props.data.allProjectEntriesJson.edges.forEach((entry) => {
      projectSections.push(getProjectSectionComponent(entry, entry.node.entity));
    });

    this.props.data.allSkillEntriesJson.edges.forEach((entry) => {
      skillSections.push(
        <div key={entry.node.title}>
          <SectionSubheader>{entry.node.title}</SectionSubheader>
          <p
            style={{ marginTop: '0' }}
            dangerouslySetInnerHTML={{ __html: entry.node.elements.join(', ') }}
          />
        </div>,
      );
    });

    return (
      <ResumeBody
        ref={(node) => {
          this.node = node;
        }}
      >
        <Helmet>
          <title>Resume - Jeffrey Xiao</title>
        </Helmet>
        <ResumeLeftColumn>
          <SectionHeader>Experience</SectionHeader>
          {experienceSections}
          <SectionHeader>Projects</SectionHeader>
          {projectSections}
        </ResumeLeftColumn>
        <ResumeRightColumn>
          <SectionHeader>Links</SectionHeader>
          <LinksSection />
          <SectionHeader>Skills</SectionHeader>
          {skillSections}
          <SectionHeader>Awards</SectionHeader>
          <AwardsSection awards={this.props.data.allAwardEntriesJson.edges} />
          <SectionHeader>Certifications</SectionHeader>
          <Description>{certifications}</Description>
          <SectionHeader>Education</SectionHeader>
          {educationSections}
          <SectionHeader>Interests</SectionHeader>
          <Description>{interests}</Description>
        </ResumeRightColumn>
        <Clear />
      </ResumeBody>
    );
  }
}

export default ResumePage;
export const pageQuery = graphql`
  {
    allExperienceEntriesJson {
      edges {
        node {
          entity
          subEntity
          location
          time
          description
        }
      }
    }

    allProjectEntriesJson {
      edges {
        node {
          entity
          subEntity
          category
          tags
          description
        }
      }
    }

    allSkillEntriesJson {
      edges {
        node {
          title
          elements
        }
      }
    }

    allAwardEntriesJson {
      edges {
        node {
          date
          title
        }
      }
    }

    allCertificationEntriesJson {
      edges {
        node {
          certificationName
        }
      }
    }

    allEducationEntriesJson {
      edges {
        node {
          entity
          subEntity
          locationTime
          description
        }
      }
    }

    allInterestEntriesJson {
      edges {
        node {
          interestName
        }
      }
    }
  }
`;
