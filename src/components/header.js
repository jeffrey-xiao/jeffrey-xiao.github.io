import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Link from "./link";
import colors from "../utils/colors";

const Navbar = styled.div`
  padding-bottom: 25px;
  text-align: center !important;
  transition: all 0.4s;
  font-family: "Josefin Sans", sans-serif;
  margin-bottom: 30px;
`;

const NavbarLinkStyled = styled(({ active, children, ...props }) => (
  <Link {...props}>{children}</Link>
))`
  text-decoration: none;
  padding: 25px 10px;
  letter-spacing: 2px;
  transition: all 0.4s;
  color: ${(props) => (props.active ? colors.base1() : colors.base4())};
  border-bottom: 1px solid ${(props) => (props.active ? colors.base1() : colors.base4())};

  @media only screen and (max-width: 32em) {
    letter-spacing: 2px;
    font-size: 14px;
    padding: 25px 5px;
  }
`;

class NavbarLink extends React.Component {
  constructor(props) {
    super(props);
    this.toggleHover = this.toggleHover.bind(this);
    this.state = {
      hover: false,
    };
  }

  getSanitizedActivePage() {
    const ret = this.props.activePage.substr(1);
    if (ret === "") {
      return "home";
    }
    return ret.split("/")[0];
  }

  toggleHover() {
    this.setState((prevState) => ({ hover: !prevState.hover }));
  }

  render() {
    let target;

    if (this.props.currentPage === "home") {
      target = "/";
    } else {
      target = `/${this.props.currentPage}`;
    }

    return (
      <NavbarLinkStyled
        to={target}
        active={this.props.currentPage === this.getSanitizedActivePage() || this.state.hover}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        {this.props.currentPage.toUpperCase()}
      </NavbarLinkStyled>
    );
  }
}

NavbarLink.propTypes = {
  activePage: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
};

const HeaderParent = styled.div`
  transition: all 0.4s;
  position: relative;
  transform: translateY(${(props) => (props.isHomepage ? "50vh" : 0)});
  margin: 0 -20px;
`;

const HeaderWrapper = styled.div`
  transition: all 0.4s;
  text-align: center !important;
  transform: translateY(${(props) => (props.isHomepage ? "-50%" : 0)});
`;

const HeaderBio = styled.div`
  height: ${(props) => (props.isHomepage ? "auto" : 0)};
  margin: ${(props) => (props.isHomepage ? "10px 0 25px 0" : 0)};
  overflow: hidden;
  max-width: 415px;
  width: 95%;
  display: inline-block;
  line-height: 30px;
  font-size: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: lighter;
  text-align: center !important;
  color: ${colors.base1()};
`;

const HeaderTitle = styled.div`
  text-align: center !important;
  padding-top: ${(props) => (props.isHomepage ? "0" : "25px")};
  font-size: 60px;
  color: ${colors.base1()};
  margin: 0px;
  font-weight: normal;
  font-family: "Josefin Slab", sans-serif;
`;

const Header = (props) => {
  const isHomepage = props.activePage === "/";
  return (
    <HeaderParent isHomepage={isHomepage}>
      <HeaderWrapper isHomepage={isHomepage}>
        <HeaderTitle isHomepage={isHomepage}>jeffreyxiao</HeaderTitle>
        <HeaderBio isHomepage={isHomepage}>
          Hi! I&#39;m a student at the University of Waterloo studying software engineering. I have
          an interest in large scale distributed algorithms and infrastructure for data analytics. I
          also enjoy working with low level systems.
        </HeaderBio>
        <Navbar>
          <NavbarLink activePage={props.activePage} currentPage="home" />
          <NavbarLink activePage={props.activePage} currentPage="resume" />
          <NavbarLink activePage={props.activePage} currentPage="projects" />
          <NavbarLink activePage={props.activePage} currentPage="blog" />
        </Navbar>
      </HeaderWrapper>
    </HeaderParent>
  );
};

Header.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default Header;
