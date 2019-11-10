import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faEnvelope,
  faLink,
  faFilePdf,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "./index.scss";
import Footer from "../components/footer";
import Header from "../components/header";

library.add(
  faFacebook,
  faGithub,
  faLinkedin,
  faEnvelope,
  faLink,
  faFilePdf,
  faMinus,
  faPlus,
  faAngleLeft,
  faAngleRight,
);
config.autoAddCss = false;

const LayoutWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 90%;
  max-width: 1000px;
`;

const Layout = (props) => (
  <LayoutWrapper>
    <Helmet>
      <title>Jeffrey Xiao</title>
      <meta
        name="description"
        content={`
          Jeffrey Xiao. I&#39;m a student at the University of Waterloo with an interest in
          distributed systems and scalable infrastructure design.
        `}
      />
    </Helmet>
    <Header activePage={props.location.pathname} />
    {props.children}
    <Footer activePage={props.location.pathname} />
  </LayoutWrapper>
);

Layout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.element.isRequired,
};

export default Layout;
