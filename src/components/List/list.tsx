import React, { useContext, useEffect, useState } from "react";
import { PlaylistSubject } from "../../services/playlist-service";
import { playlistState } from "../../states/playlist-state";
import axios from "axios";
import './styles.scss';
import { useRecoilState } from "recoil";

interface Example {
    id: number,
    name: string,
    types: Array<string>,
    image: string,
}

//Donde defino la funcion gettoken
//Por qué no me sirve el segundo useEffect cuando defino el accesToken con let
const List:React.FC<{searchParam:string}> = ({searchParam}) => {
    //id nombre foto tipo
    const [playlist, setPlaylist] = useRecoilState<{playlist: Array<any>}>(playlistState);
    
    const [artistList, setArtistList] = useState<Array<any>>([]);
    const [trackList, setTrackList] = useState<Array<any>>([]);
    const [albumList, setAlbumList] = useState<Array<any>>([]);
    const [accessToken, setAccessToken] = useState<string>('');

    const getToken = () => {
        const data = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: '3e6c5bfb8e6f4d3a91ca0eb0cbe3f673',
            client_secret: 'e8fa8089ad2341db806f4d3cf4b0c55a',
        });
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        return axios.post('https://accounts.spotify.com/api/token', data, config);
    }

    const getSearch = (token:string, searchParam:string) => {
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const queryParams = new URLSearchParams({
            q: searchParam,
            type: 'artist,track,album',
            limit: '10',
            offset: '0'
        });

        return axios.get(`https://api.spotify.com/v1/search?${queryParams.toString()}`, {headers});
    }

    const addTrack = (track: any) => {
        if(!playlist.playlist.includes(track)){
            setPlaylist({playlist: [...playlist.playlist, track]});
        }
        else{
            console.log('ya se encuentra incluido');
        }
    }

    useEffect(() => { 
        getToken()
        .then((response) => {
            //accessToken = response.data.access_token;
            setAccessToken(response.data.access_token);
            console.log('Access Token:', accessToken);
        })
        .then(() => getSearch(accessToken, 'quevedo'))
        .then((response) => {
            setArtistList(response.data.artists.items);
        })
        .catch(error => {});
    },[]);

    useEffect(() => {
        console.log(searchParam);
        if(searchParam !== ''){
            getSearch(accessToken, searchParam)
            .then((response) => {
                console.log(response.data);
                setArtistList(response.data.artists.items);
                setTrackList(response.data.tracks.items);
                setAlbumList(response.data.albums.items);
            })
            .catch(error =>{});
        }
    }, [searchParam]);

    return(
        <ul className="container container--size-80 container--scroll list">
            {artistList.map((artist) =>
                <li className="list__item list__item--2cols" key={`${artist.id}`}>
                    <div>{artist.name}</div>
                    {artist.images.length > 0? (
                        <img style={{height:'100px', width:'100px'}} src={artist.images[0].url} alt={artist.name} />
                    )
                    : (
                        <div style={{height:'100px', width:'100px', display:'flex', justifyContent:'center', alignItems: 'center'}}>No Image</div>
                    )
                    }
                </li>
            )}
            {trackList.map((track) =>
                <li className="list__item list__item--3cols" key={`${track.id}`}>
                    <div>{track.name}</div>
                    {track.album.images.length > 0? (
                        <img style={{height:'100px', width:'100px'}} src={track.album.images[0].url} alt={track.name} />
                    )
                    : (
                        <div style={{height:'100px', width:'100px', display:'flex', justifyContent:'center', alignItems: 'center'}}>No Image</div>
                    )}
                    <button onClick={() => addTrack(track)}>+</button>
                </li>
            )}
            {albumList.map((album) =>
                <li className="list__item list__item--2cols" key={`${album.id}`}>
                    <div>{album.name}</div>
                    {album.images.length > 0? (
                        <img style={{height:'100px', width:'100px'}} src={album.images[0].url} alt={album.name} />
                    )
                    : (
                        <div style={{height:'100px', width:'100px', display:'flex', justifyContent:'center', alignItems: 'center'}}>No Image</div>
                    )
                    }
                </li>
            )}
        </ul>
    );
}

 export default List;