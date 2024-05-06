import { ChangeEvent, useEffect, useState} from 'react';
import './styles.scss';

interface QuantityAdjusterProps {
    productName?: string;
    startingQuantity?: number;
    handleQuantity: (newQuantity: number, productName?:string) => void;
    resetQuantity?: boolean;
}

const QuantityAdjuster:React.FC<QuantityAdjusterProps> = ({productName, startingQuantity, handleQuantity, resetQuantity}) => {
    const [text, setText] = useState<string>(startingQuantity? (startingQuantity <= 99? startingQuantity.toString() : '99') : '1');
    const [quantity, setQuantity] = useState<number>(startingQuantity? (startingQuantity <= 99? startingQuantity : 99) : 1);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const number = parseInt(e.target.value, 10);
        if(!isNaN(number) || e.target.value === ''){
            setText(e.target.value);
        }
    }

    const checkNumber = () => {
        const number = parseInt(text, 10);
        if(!isNaN(number) && number !== 0){
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
        if(productName){
            handleQuantity(quantity, productName);
        }
        else{
            handleQuantity(quantity);
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