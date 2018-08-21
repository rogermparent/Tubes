import React from "react"
import Layout from "./base"
import PostList from "../components/post-list"
import rehypeReact from "rehype-react"
import {graphql} from "gatsby"

const renderAst = new rehypeReact({
    createElement: React.createElement,
}).Compiler;

export default ({data: {page, posts}}) => (
    <Layout>
      {page.frontmatter.title ? (<h1>{page.frontmatter.title}</h1>) : null}
        <div>{renderAst(page.htmlAst)}</div>
        <PostList posts={posts} />
        </Layout>
)

export const pageQuery = graphql`
query HomePageQuery($pageID: String!) {
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
      dir: {eq: "pages/posts" }
    }
  }
  sort: {
    fields: [frontmatter___date]
    order: DESC
  }
  limit: 5) {
    edges{
      node{
        fields {
          path
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
