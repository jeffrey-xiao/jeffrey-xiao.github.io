import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => (
  <Helmet>
    <title>Jeffrey Xiao</title>
    <meta
      name="description"
      content={`
        Hi! I'm a student at the University of Waterloo studying software engineering.
        I have an interest in modern and reactive web development as well as developing
        infrastructure to solve big problems.
      `}
    />
  </Helmet>
);

export default HomePage;
