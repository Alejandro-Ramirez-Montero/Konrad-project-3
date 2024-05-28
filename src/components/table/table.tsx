import './styles.scss';


interface Column {
    header: string;
    accessor: string;
}
  
interface TableProps {
    columns: Column[];
    data: any[];
    edit?: (id: number) => void;
    deleteRow?: (id: number) => void;
}

const Table:React.FC<TableProps> = ({columns, data, edit, deleteRow}) => {
    return (
        <table className='table'>
            <thead className='table__header'>
                <tr>
                    {columns.map((column, index) => (
                    <th className='table__header-title' key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='table__body'>
                {data.map((row, rowIndex) => (
                    <tr className='table__row' key={rowIndex}>
                    {columns.map((column, colIndex) => (
                        <td className='table__column' key={colIndex}>{`${column.accessor == 'price' || column.accessor == 'total'? '$' : ''} ${row[column.accessor]}`}</td>
                    ))}
                    { edit &&
                        <td className='table__button-column'><button className='table__button' type='button' onClick={() => edit(row.id)}>Edit</button></td>
                    }
                    { deleteRow &&    
                        <td className='table__button-column'><button className='table__button table__button--brown' type='button' onClick={() => deleteRow(row.id)}>Delete</button></td>
                    }
                    </tr>
                ))}
            </tbody>
        </table>
      );
}

 export default Table;