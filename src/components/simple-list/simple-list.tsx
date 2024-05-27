import './styles.scss';

import QuantityAdjuster from '../quantity-adjuster/quantity-adjuster';

interface cartProductInterface {
    id: number,
    name: string,
    quantity: number,
    price: number,
    totalPrice: number,
    image: string,
  }

interface SimpleListProps {
    list: Array<cartProductInterface>,
    handleQuantity: (productId: number, newQuantity: number,) => void,
    removeProduct: (productId: number) => void
}

const SimpleList:React.FC<SimpleListProps> = ({list, handleQuantity, removeProduct}) => {

    return(
        <ul className="simple-list">
            {list.map((product) =>
                <li className='simple-list__item' key={`${product.name}`}>
                    <img className='simple-list__image' src={product.image} alt={product.name + 'image'} />
                    <div className='simple-list__row-container'>
                        <h3 className='simple-list__name'>{product.name}</h3>
                        <div className='simple-list__grid'>
                            <span className='simple-list__price'>{'Quantity Price: $' + product.totalPrice}</span>
                            <span className='simple-list__price'>{'Unit Price: $' + product.price}</span>
                            <QuantityAdjuster handleQuantity={handleQuantity} productId={product.id} startingQuantity={product.quantity}/>
                            <button className='simple-list__button' onClick={() => removeProduct(product.id)}>Remove</button>
                        </div>
                    </div>
                </li>
            )}
        </ul>
    );
}

 export default SimpleList;