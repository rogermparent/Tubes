import React from "react";
//import {Link} from "gatsby";
import Image from "gatsby-image";
import Moment from "moment";

export const VideoListing = (
    {
        title,
        thumbnail,
        channel,
        publishTime,
        length,
        download
    }
) => {
    const videoMoment = Moment(publishTime);
    return (
        <li>
          <a href={download}>
            <Image fluid={thumbnail.childImageSharp.fluid} />
          </a>
          <div className="video-info">
            <h2>
              <a href={download}>
                {title}
              </a>
            </h2>
            <ul>
              {
                  length ? (<li className="video-length">{length}</li>) : null
              }
        {
            channel ? (<li className="channel-download">{channel}</li>) : null
        }
        {
            publishTime ? (<li className="video-published">{videoMoment.calendar()}</li>) : null
        }
        </ul>
            </div>
            </li>
    );
}

export default VideoListing;
