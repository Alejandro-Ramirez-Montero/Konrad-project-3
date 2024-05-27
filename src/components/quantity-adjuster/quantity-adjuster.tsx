import { ChangeEvent, useEffect, useState} from 'react';
import './styles.scss';

interface QuantityAdjusterProps {
    productId: number,
    startingQuantity?: number;
    handleQuantity: (productId: number, newQuantity: number) => void;
    resetQuantity?: boolean;
}

const QuantityAdjuster:React.FC<QuantityAdjusterProps> = ({productId, startingQuantity, handleQuantity, resetQuantity}) => {
    const [text, setText] = useState<string>(startingQuantity? (startingQuantity <= 99? startingQuantity.toString() : '99') : '1');
    const [quantity, setQuantity] = useState<number>(startingQuantity? (startingQuantity <= 99? startingQuantity : 99) : 1);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if((/^\d+$/.test(e.target.value) || e.target.value === '') && e.target.value.length <= 2){
            setText(e.target.value);
        }
    }

    const checkNumber = () => {
        const number = parseInt(text, 10);
        if(!isNaN(number) && number > 0 && number < 100){
            setQuantity(number);
        }
        else{
            setQuantity(1);
            setText('1');
        }
    }

    const handleButton = (newQuantity: number) => {
        setQuantity(newQuantity);
        setText(newQuantity.toString());
    }

    useEffect(() => {
        if(resetQuantity != undefined){
            setQuantity(1);
            setText('1');
        }
    },[resetQuantity]);

    useEffect(() => {
        if(!firstLoad){
            handleQuantity(productId, quantity);
        }
        else{
            setFirstLoad(false);
        }
    },[quantity]);

    return(
    <div className="quantity-adjuster">
        <button className="quantity-adjuster__button" disabled={quantity <= 1? true:false} onClick={() => handleButton(quantity-1)}>-</button>
        <input className="quantity-adjuster__input" type="text" maxLength={2} name="quantity input" aria-label="manual quantity input" value={text} onChange={handleInputChange} onBlur={checkNumber}/>
        <button className="quantity-adjuster__button" disabled={quantity >= 99? true:false} onClick={() => handleButton(quantity+1)}>+</button>
    </div>
    );
}

 export default QuantityAdjuster;