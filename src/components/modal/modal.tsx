import React, { useEffect, useState } from "react";
import { PlaylistSubject } from "../../services/playlist-service";
import axios from "axios";
import './styles.scss';

interface Example {
    id: number,
    name: string,
    types: Array<string>,
    image: string,
}

const Modal:React.FC<{modalOpen:boolean}> = ({modalOpen}) => {
    return(
        <>
        {modalOpen?
            <div className="modal">
                hola
            </div>
            :
            <></>
        }
        </>
    );
}

 export default Modal;