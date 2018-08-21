import React from "react";
import Layout from "../base";
import {graphql} from "gatsby";
import PostList from "../../components/post-list";

import rehypeReact from "rehype-react";

const renderAst = new rehypeReact({
    createElement: React.createElement,
}).Compiler;

const BlogIndexLayout = ({data}) => {
    const page = data.page;
    return (
        <Layout>
          <div>
            {renderAst(page.htmlAst)}
          </div>
          <PostList posts={data.posts} />
        </Layout>
    );
}

export default BlogIndexLayout;

export const pageQuery = graphql`
query BlogIndexQuery($pageID: String!) {
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
  posts: allMarkdownRemark(filter: {
    fields: {
      dir: {eq: "pages/posts"}
    }
  }
  sort: {
    fields: [frontmatter___date]
    order: DESC
  }
) {
    edges{
      node{
        fields {
          slug
        }
        frontmatter {
          title
          category
          date
        }
      }
    }
  }
}
`;
