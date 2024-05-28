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
    buttonsMap?: { [key: string]: [(...args: any[]) => void, disabledCondition: string[], conditionColumn: string | null, style: string, args?: any[]]};
}

const Table:React.FC<TableProps> = ({columns, data, edit, deleteRow, buttonsMap}) => {

    const handleClick = (handler: (...args: any[]) => void, args: any[] = [], row: any[], key: string) => {

            let paramsToSend: any[] = [];
            if(args){
                args.map(arg => {
                    columns.map(column => {
                        if(arg == column.accessor){
                            paramsToSend.push(row[arg]);
                            return;
                        }
                    });
                });
            }
            paramsToSend.push(key);
            handler(...paramsToSend ?? []);
    };

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
                        <td className='table__column' key={colIndex}>{`${column.accessor == 'price' || column.accessor == 'total'? '$' : ''}${row[column.accessor]}`}</td>
                    ))}
                    { edit &&
                        <td className='table__button-column'><button className='table__button' type='button' onClick={() => edit(row.id)}>Edit</button></td>
                    }
                    { deleteRow &&    
                        <td className='table__button-column'><button className='table__button table__button--brown' type='button' onClick={() => deleteRow(row.id)}>Delete</button></td>
                    }
                    {buttonsMap && Object.keys(buttonsMap).map((key) => {
                        const [onClickHandler, disabledCondition, conditionColumn, style, args] = buttonsMap[key];


                        const isDisabled = conditionColumn? disabledCondition?.includes(row[conditionColumn] ?? '') : false;

                        return (
                            <td className='table__button-column' key={key}>
                                <button
                                    className={`table__button table__button--${style}`}
                                    type='button'
                                    disabled={isDisabled}
                                    onClick={() => handleClick(onClickHandler, args, row, key)}
                                >
                                    {key}
                                </button>
                            </td>
                        );
                    })}
                    </tr>
                ))}
            </tbody>
        </table>
      );
}

 export default Table;