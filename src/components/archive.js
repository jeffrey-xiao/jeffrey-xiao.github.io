import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import '../assets/font-awesome/css/font-awesome.min.css';

import Section from './section';
import SectionHeader from './sectionHeader';
import StyledLink from './styledLink';
import colors from '../assets/colors';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ArchiveLinkWrapper = styled.div`
  padding: 0 0 8px 15px;
`;

const ArchiveLink = styled(StyledLink)`
  display: inline;
  line-height: 15px;
  z-index: 0;
`;

const NestedIcon = styled(FontAwesome)`
  font-size: 0.5em;
  vertical-align: middle;
  color: ${colors.base1()};
`;

const NestedLabel = styled.span`
  padding-left: 5px;
`;

const NestedLabelWrapper = styled.div`
  cursor: pointer;
  padding-top: ${props => (props.filterType === 'month' ? '10px' : '5px')};
  opacity: 1 !important;
  height: auto !important;
  display: block;
  position: relative;
  font-family: "Josefin Sans", sans-serif;
  z-index: ${props => (props.filterType === 'month' ? 3 : 1)} !important;
  color: ${colors.base1()};
`;

const NestedLinkWrapper = styled.div`
  padding-left: ${props => (props.filterValue ? 15 : 0)}px;
  overflow: hidden;
  min-height: ${props => (props.filterType === 'month' ? 30 : 0)}px;
  & > div {
    opacity: ${props => (props.active ? 1 : 0)};
    height: ${props => (props.active ? 'auto' : 0)};
    z-index: ${props => (props.active ? 'auto' : -1)};
  }
`;

class NestedLink extends React.Component {
  constructor(props) {
    super(props);
    this.toggleActive = this.toggleActive.bind(this);
    this.state = { active: (!this.props.filterValue) && this.props.active };
  }

  toggleActive() {
    this.setState(prevState => ({ active: !prevState.active }));
  }

  render() {
    const elements = [];

    if (this.props.filterValue) {
      elements.push(
        <NestedLabelWrapper
          key={this.props.filterValue}
          onClick={this.toggleActive}
          filterValue={this.props.filterValue}
        >
          <NestedIcon name={this.state.active ? 'minus' : 'plus'} />
          <NestedLabel>{this.props.filterValue} ({this.props.posts.length})</NestedLabel>
        </NestedLabelWrapper>,
      );
    }

    if (this.props.filterType) {
      const buckets = new Map();
      this.props.posts.forEach((post) => {
        const postDate = new Date(post.node.frontmatter.date_created);

        // filterType should be '', 'year', or 'month'
        const filterTarget = this.props.filterType === 'year' ? postDate.getFullYear() : postDate.getMonth();

        if (!buckets.has(filterTarget)) {
          buckets.set(filterTarget, []);
        }
        buckets.get(filterTarget).push(post);
      });

      Array.from(buckets.entries()).forEach(([key, value]) => {
        elements.push(
          <NestedLink
            key={key}
            active={this.state.active}
            posts={value}
            filterType={this.props.filterType === 'year' ? 'month' : ''}
            filterValue={this.props.filterType === 'year' ? String(key) : months[key]}
          />,
        );
      });
    } else {
      this.props.posts.forEach((post) => {
        elements.push(
          <div key={post.node.frontmatter.path}>
            <ArchiveLinkWrapper>
              <ArchiveLink key={post.node.frontmatter.path} to={post.node.frontmatter.path}>
                {post.node.frontmatter.title}
              </ArchiveLink>
            </ArchiveLinkWrapper>
          </div>,
        );
      });
    }

    return (
      <NestedLinkWrapper
        active={this.state.active}
        filterType={this.props.filterType}
        filterValue={this.props.filterValue}
      >
        {elements}
      </NestedLinkWrapper>
    );
  }
}

NestedLink.propTypes = {
  active: PropTypes.bool,
  filterType: PropTypes.string,
  filterValue: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
};

NestedLink.defaultProps = {
  active: false,
  filterType: '',
  filterValue: '',
  posts: [],
};

const Archive = props => (
  <Section style={{ textAlign: 'center' }}>
    <SectionHeader>Archive</SectionHeader>
    <NestedLink
      active
      activePost={props.activePost}
      posts={props.posts}
      filterType="year"
      filterValue=""
    />
  </Section>
);

Archive.propTypes = {
  activePost: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.object),
};

Archive.defaultProps = {
  activePost: '',
  posts: [],
};

export default Archive;
