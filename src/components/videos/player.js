import React from "react";

import WebTorrent from 'webtorrent';
import ParseTorrent from 'parse-torrent';

const client = new WebTorrent({
    tracker: {
        userAgent: navigator ? navigator.userAgent : "tubes/0.1"
    }
});

const stripXS = (torrentID) => {
    const parsedTorrent = ParseTorrent(torrentID);
    parsedTorrent.xs = undefined;
    return parsedTorrent;
}


class MediaPlayer extends React.Component {
    render(){
        const {torrentID} = this.props
        const mountTorrent = this.playCurrentTorrent.bind(this)
        return (
            <>
              <div id="player">
                {torrentID}
              </div>
              <button onClick={mountTorrent}>Mount Torrent</button>
            </>
        )
    }

    componentDidMount() {
        this.openTorrent(this.props.torrentID)
    }

    openTorrent(torrentID){
        const parsedTorrent = stripXS(torrentID);
        const existingTorrent = client.get(parsedTorrent);

        if(existingTorrent) {
            existingTorrent.xs = undefined;
            this.playTorrent(existingTorrent);
        } else {
            client.add(stripXS(parsedTorrent), {}, (torrent) => {this.playTorrent(torrent)});
        }
    }

    playCurrentTorrent(){
        this.openTorrent(this.props.torrentID);
    }

    playTorrent(torrent) {
        console.log(torrent);
        // Add the torrent to the client.
        const file = torrent.files.find((file) => (file.name.endsWith('.mp4')))
        // Add the file to the player
        this.displayFile(file)
    }

    displayFile(file) {
        const playerElem = document.getElementById('player')
        playerElem.innerHTML = null;

        file.appendTo(playerElem)
    }
}

export default MediaPlayer;
