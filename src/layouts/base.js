import React from 'react';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import '../styles/main.scss';
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

export default ({children, contextualNav, title}) => (
    <StaticQuery
      query={ graphql`
query BaseLayoutQuery {
  siteConfig: configYaml(fields: {dir: {eq: "data/config"}, slug: {eq: "site"}}) {
    title
    header_nav {
      label
      url
    }
  }
}
`
      }
      render={({siteConfig}) => (
          <div id="site">
            <Helmet>
              <title>{title ? `${title} | ${siteConfig.title}` : siteConfig.title}</title>
            </Helmet>
            <Header
              title={siteConfig.title}
              nav={siteConfig.header_nav}
              contextualNav={contextualNav}
              />
            <main>
              { children }
            </main>
            <Footer />
          </div>
      )}
        />
)
