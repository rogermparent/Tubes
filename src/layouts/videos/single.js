import React from "react";
import Layout from "../base";
import TorrentPlayer from "../../components/videos/player";
import {graphql} from "gatsby";

export const pageQuery = graphql`
query SingleVideo($pageID: String){
  video: markdownRemark(id: {eq: $pageID}) {
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
`

export default (props) => {
    const {pageContext, data} = props
    return (
        <Layout>
          <TorrentPlayer torrentID={data.video.frontmatter.link} />
        </Layout>
    )
}
