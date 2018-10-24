import FontAwesome from 'react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import '../assets/font-awesome/css/font-awesome.min.css';

import colors from '../assets/colors';


const FooterDiv = styled.div`
  padding-bottom: 30px;
  width: 100%;
  text-align: center !important;
  position: ${props => (props.isHomepage ? 'fixed' : 'relative')};
  transform: ${props => (props.isHomepage ? 'translateX(-50%)' : 'none')};
  left: ${props => (props.isHomepage ? '50%' : '0')};
  bottom: 0;
`;

const FooterIcon = styled(FontAwesome)`
  color: ${colors.base1()};
  font-size: 25px !important;
  transition: all 0.5s;
  text-align: center;
  vertical-align: middle;

  &:hover {
    color: ${colors.accent1()};
  }
`;

const FooterLink = props => (
  <a href={props.url} style={{ margin: '0 15px' }}>
    <FooterIcon name={props.iconName} />
  </a>
);

const Footer = props => (
  <FooterDiv isHomepage={props.activePage === '/'}>
    <FooterLink url="https://github.com/jeffrey-xiao" iconName="github-alt" />
    <FooterLink url="https://www.linkedin.com/in/jeffreyxiao" iconName="linkedin" />
    <FooterLink url="https://www.facebook.com/jeffrey.xiao1998" iconName="facebook" />
    <FooterLink url="mailto:jeffrey.xiao1998@gmail.com" iconName="envelope" />
  </FooterDiv>
);

export default Footer;
