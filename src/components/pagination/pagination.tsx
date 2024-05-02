import './styles.scss';

interface PaginationProps {
    currentPage: number,
    lastPage: number,
    setCurrentPage: (newCurrentPage: number) => void,
}

const Pagination:React.FC<PaginationProps> = ({currentPage, lastPage, setCurrentPage}) => {

    return(
    <div className="pagination">
        <button className={`pagination__button`} disabled={currentPage === 0? true : false} onClick={() => setCurrentPage(currentPage-1)}>Previous</button>
        {currentPage - 1 >= 0 &&
            <button className="pagination__button-number" onClick={() => setCurrentPage(currentPage-1)}>{currentPage}</button>
        }
        <button className="pagination__button-number" disabled={true}>{currentPage+1}</button>
        {currentPage + 1 <= lastPage &&
            <button className="pagination__button-number" onClick={() => setCurrentPage(currentPage+1)}>{currentPage+2}</button>
        }
        <button className="pagination__button" disabled={currentPage >= lastPage? true : false} onClick={() => setCurrentPage(currentPage+1)}>Next</button>
    </div>
    );
}

 export default Pagination;