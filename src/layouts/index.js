import React from 'react';
import { Helmet } from 'react-helmet';
import { Box } from 'grid-styled';
import styled from 'styled-components';

import Header from '../components/header';
import Footer from '../components/footer';
import './index.scss';

const LayoutWrapper = styled(({ activePage, children, ...rest }) => (
  <Box {...rest}>{children}</Box>
))`
  max-width: 1000px;
  display: inline-block;
  height: 99%;
  overflow: ${props => (props.activePage === '/' ? 'hidden' : 'visible')};
`;

const Layout = props => (
  <LayoutWrapper
    width={[1, 95 / 100, 90 / 100]}
    m="0 auto"
    px={[20, 20, 0]}
    activePage={props.location.pathname}
  >
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
    {props.children()}
    <Footer activePage={props.location.pathname} />
  </LayoutWrapper>
);

export default Layout;
