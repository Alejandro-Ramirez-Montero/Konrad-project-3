import './styles.scss';

interface productInterface {
    name: string,
    path: string,
    description: string,
    price: string,
    image: string,
    categories: Array<string>,
  }

const List:React.FC<{classes: string, list: Array<productInterface>, showProduct: (productPath: string) => void}> = ({classes, list, showProduct}) => {


    return(
        <ul className={'product-list ' + classes}>
            {list.map((product) =>
                <li key={`${product.path}`}>
                    <button className={'product-list__container'} tabIndex={-1} onClick={() => showProduct(product.path)}>
                        <div className='product-list__container-hover' tabIndex={0}>View Details</div>
                        <div className='product-list__image-container'>
                        <img className='product-list__image' src={product.image} alt={product.name + 'image'} />
                        </div>
                        <h3 className='product-list__name'>{product.name}</h3>
                        <span className='product-list__price'>{'$' + product.price}</span>
                    </button>
                </li>
            )}
        </ul>
    );
}

 export default List;