import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { playlistState } from "../../states/playlist-state";
import './styles.scss';
import { useRecoilState } from "recoil";

const SideBar: React.FC<{}> = ({}) => {
    const [playlist, setPlaylist] = useRecoilState<{playlist: Array<any>}>(playlistState);
    return(
        <ul className="container side-bar container--scroll">
            <li>
                <button style={{width:'100%'}}>
                    <img style={{height:'50px', width:'50px'}} src="https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f" alt="spiderman" />
                    <h3>"Sunflower - Spider-Man: Into the Spider-Verse"</h3>
                </button>
            </li>
            {playlist.playlist.map(track => {
                console.log(track);
                return(
                    <li style={{width:'100%'}} key={track.id}>
                        <button className="side-bar__button">
                            {track.album.images.length > 0?
                                <img style={{height: '50px', width: '50px'}} src={track.album.images[0].url} alt="" />
                                :
                                <></>
                            }
                            <h3>{track.name}</h3>
                        </button>
                    </li>
                );
            })};
        </ul>
    );
}

 export default SideBar;