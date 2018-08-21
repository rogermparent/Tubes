import React from "react";
import Layout from "./base";
import {graphql} from "gatsby";

import rehypeReact from "rehype-react";

const renderAst = new rehypeReact({
    createElement: React.createElement,
}).Compiler;

export default ({data: {page}}) => {
    //const page = data.page;
    return (
        <Layout>
          {page.frontmatter.title ? (<h1>{page.frontmatter.title}</h1>) : null}
        {renderAst(page.htmlAst)}
        </Layout>
    );
}

export const pageQuery = graphql`
query DefaultPageQuery($pageID: String!) {
  page: markdownRemark(id: {eq: $pageID}) {
    fields {
      slug
      dir
    }
    frontmatter {
      title
      layout
      slug
      category
      draft
    }
    htmlAst
  }
}
`;
