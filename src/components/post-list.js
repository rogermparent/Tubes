import React from "react";
import {Link} from "gatsby";

const PostList = ({posts}) => {
    return (
        <ul className="post-list">
          {posts.edges.map(({node}, i) => {

              return (
                  <li key={`post-index-${i}`}>
                    <Link to={node.fields.path}>
                      <span>
                        <strong>{node.frontmatter.title}</strong>
                      </span>
                      &nbsp;
                      {
                          node.frontmatter.date ?
                              (
                                  <time dateTime={node.frontmatter.date}>
                                    {new Date(node.frontmatter.date).toLocaleDateString()}
                                  </time>
                              ) :
                              (
                                  <span>No Date</span>
                              )
                      }

                  </Link>
                      </li>
              )
          })}
        </ul>
    )
}

export default PostList;
