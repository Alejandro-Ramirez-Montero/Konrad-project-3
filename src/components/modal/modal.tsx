import { ReactNode } from 'react';
import './styles.scss';

const Modal:React.FC<{openModal:boolean, children?:ReactNode}> = ({openModal, children}) => {
    return(
        <>
        {openModal?
            <div className="modal">
                { children }
            </div>
            :
            <></>
        }
        </>
    );
}

 export default Modal;