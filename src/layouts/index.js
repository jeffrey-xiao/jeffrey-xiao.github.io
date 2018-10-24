import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Header from '../components/header';
import Footer from '../components/footer';
import './index.scss';

const LayoutWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 90%;
  max-width: 1000px;
`;

const Layout = props => (
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

export default Layout;
