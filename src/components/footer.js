import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import colors from "../utils/colors";

const FooterDiv = styled.div`
  padding-bottom: 30px;
  width: 100%;
  text-align: center !important;
  position: ${(props) => (props.isHomepage ? "fixed" : "relative")};
  transform: ${(props) => (props.isHomepage ? "translateX(-50%)" : "none")};
  left: ${(props) => (props.isHomepage ? "50%" : "0")};
  bottom: 0;
`;

const FooterIcon = styled(FontAwesomeIcon)`
  color: ${colors.base1()};
  font-size: 25px !important;
  transition: all 0.5s;
  text-align: center;
  vertical-align: middle;

  &:hover {
    color: ${colors.accent1()};
  }
`;

const FooterLink = (props) => (
  <a href={props.url} style={{ margin: "0 15px" }}>
    <FooterIcon icon={props.icon} />
  </a>
);

FooterLink.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
};

const Footer = (props) => (
  <FooterDiv isHomepage={props.activePage === "/"}>
    <FooterLink url="https://github.com/jeffrey-xiao" icon={["fab", "github"]} />
    <FooterLink url="https://www.linkedin.com/in/jeffreyxiao" icon={["fab", "linkedin"]} />
    <FooterLink url="https://www.facebook.com/jeffrey.xiao1998" icon={["fab", "facebook"]} />
    <FooterLink url="mailto:jeffrey.xiao1998@gmail.com" icon="envelope" />
  </FooterDiv>
);

Footer.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default Footer;
