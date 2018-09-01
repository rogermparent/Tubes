import React from "react";
//import {Link} from "gatsby";
//import Image from "gatsby-image";
import VideoListing from "./listing";

export const VideoList = (
    {
        items
    }
) => {
    return(
        <ul className="video-list">
          {console.log(items)}
          {items.map(
              ({node}, i) => (
                  <VideoListing
                    key={`video-listing-${i}`}
                    title={node.frontmatter.title}
                    thumbnail={node.frontmatter.thumbnail}
                    channel={node.frontmatter.channel}
                    length={node.frontmatter.length}
                    publishTime={node.frontmatter.upload_time}
                    download={node.frontmatter.link}
                    path={node.fields.path}
                    />
              )
          )}
        </ul>
    )
}

export default VideoList;
