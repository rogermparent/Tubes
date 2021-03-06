import React from "react";
import {graphql, StaticQuery, Link} from "gatsby";
import VideoList from "../../components/videos/list";
import Layout from "../base";
//import Helmet from "react-helmet";

export default ()=>(
    <StaticQuery
      query={graphql`
{
  videos: allMarkdownRemark(filter: {
    fields: {
      dir: {eq: "pages/videos"}
    }
  }){
    edges {
      node {
        fields {
          path
        }
        frontmatter {
          title
          length
          upload_time
          thumbnail {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          link
          channel
        }
      }
    }
  }
}
`
      }
      render={
          ({videos: {edges}})=>{
              console.log(edges);
              return(
                  <Layout title="Videos">
                    <VideoList items={edges} />
                  </Layout>
              )
          }
      }
        />
)
