import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styles.scss';
import { checkoutState } from '../../states/checkout-state';
import { useSetRecoilState } from 'recoil';

interface PaymentFormProps {
    previousStep: () => void;
    nextStep: () => void;
    active: boolean;
}

interface CheckoutInterface {
    province: string | undefined;
    city: string | undefined;
    address1: string | undefined;
    address2: string | undefined;
    zipCode: number | undefined;
    cardNumber: number | undefined;
    cardHolderName: string | undefined;
    expireDate: Date | undefined;
    cvv: number | undefined;
}

const PaymentForm:React.FC<PaymentFormProps> = ({previousStep, nextStep, active}) => {
    const setCheckoutInfo = useSetRecoilState<CheckoutInterface>(checkoutState);

    const [cardNumber, setCardNumber] = useState<string>('');
    const [cardHolderName, setCardHolderName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [cvv, setCvv] = useState<string>('');
    const [cardType, setCardType] = useState<string>('');

    const [validCardNumber, setValidCardNumber] = useState<boolean>(true);
    const [validDate, setValidDate] = useState<boolean>(true);
    const [validCvv, setValidCvv] = useState<boolean>(true);
    const [validForm, setValidForm] = useState<boolean>(false);


    const handleTextChange = (e: ChangeEvent<HTMLInputElement>, setText: (text:string) => void) => {
        setText(e.target.value);
    }

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(/^(?:\d{0,2}\/?\d{0,2}|)$/.test(e.target.value)){
            console.log(e.target.value);
            if (date.length > e.target.value.length) {
                console.log(date.slice(date.length-1));
                if(date.slice(date.length-1) === '/'){
                    setDate(e.target.value.slice(0, e.target.value.length - 1));
                }
                else{
                    setDate(e.target.value);
                }
                return;
            }
            else if(e.target.value.length == 2 && !e.target.value.includes('/')){
                setDate(e.target.value + '/');
                return;
            }
            else{
                setDate(e.target.value);
            }
        }
    }

    const luhnCheck = (cardNumber: string) => {
        let sum = 0;
        let shouldDouble = false;
        
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);
    
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return (sum % 10) === 0;
    }

    const validateCardNumber = (cardNum: string) => {
        const cleanedCardNumber = cardNum.replace(/\s/g, '');
        let type = '';

        if (/^\d+$/.test(cleanedCardNumber) && cleanedCardNumber.length >= 14 && cleanedCardNumber.length <= 19 && luhnCheck(cleanedCardNumber)) {
            if (/^4/.test(cleanedCardNumber)) {
                type = 'Visa';
            }
            else if (/^5[1-5]/.test(cleanedCardNumber)) {
                type = 'MasterCard';
            }
            else if (/^3[47]/.test(cleanedCardNumber)) {
                type = 'American Express';
            }
        }
        setCardType(type);
        setValidCardNumber(type? true : false);
    }

    const validateExpirationDate = (expirationDate: string) => {
        const dateRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        let validExpirationDate = false;

        if(dateRegex.test(expirationDate)){
            const parts = expirationDate.split('/');
            const month = parseInt(parts[0], 10);
            const year = parseInt(parts[1], 10);
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear() % 100;

            if (month >= 1 && month <= 12 && year > currentYear || year == currentYear && month >= currentMonth + 1) {
                validExpirationDate = true;
            }
        }

        setValidDate(validExpirationDate);
    }

    const validateCvv = (cvvToValidate: string) => {
        let cvvRegex: (RegExp | null) = null;

        switch (cardType) {
            case 'Visa':
            case 'MasterCard':
                cvvRegex = /^\d{3}$/;
                break;
            case 'American Express':
                cvvRegex = /^\d{4}$/;
                break;
            default:
                break;
        }

        setValidCvv(cvvRegex? cvvRegex.test(cvvToValidate) : false);
    }

    const convertToDate = (datetoParse: string) => {
        const [monthStr, yearStr] = datetoParse.split('/');

        const date = new Date(parseInt('20'+yearStr, 10), parseInt(monthStr, 10) - 1, 1);
        return date;
    }

    const savePaymentinfo = () => {
        setCheckoutInfo((checkoutInfo) => ({
            ...checkoutInfo,
            cardNumber: parseInt(cardNumber, 10),
            cardHolderName: cardHolderName,
            expireDate: convertToDate(date),
            cvv: parseInt(cvv, 10),
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(validForm){
            //setear los inputs en el recoil
            savePaymentinfo();
            nextStep();
        }
        //handleLogin(email.trim(), password.trim());
    }

    const validateForm = () => {
        setValidForm(cardNumber && cardHolderName && date && cvv && validCardNumber && validDate && validCvv? true : false);
    }

    useEffect(() => {
        validateForm();
    },[cardNumber, cardHolderName, date, cvv]);


    return(
    <form className="payment-form" onSubmit={handleSubmit}>
        <div className='payment-form__row'>
            <div className="payment-form__col">
                <label htmlFor="cardNumber" className='payment-form__label'><span className='payment-form__asterisk'>*</span>Card Number: {!validCardNumber && <span className='payment-form__alert-message'>invalid card</span>}</label>
                <input className='payment-form__input' type="text" id="cardNumber" placeholder='card number...' value={cardNumber} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setCardNumber); validateCardNumber(e.target.value)}}/>
            </div>
            <div className="payment-form__col">
                <label htmlFor="cardHolderName" className='payment-form__label'><span className='payment-form__asterisk'>*</span>Card Holder Name:</label>
                <input className='payment-form__input' type="text" id="cardHolderName" placeholder='card holder name...' value={cardHolderName} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> handleTextChange(e, setCardHolderName)}/>
            </div>
        </div>
        <div className='payment-form__row'>
            <div className="payment-form__col">
                <label htmlFor="expirationDate" className='payment-form__label'><span className='payment-form__asterisk'>*</span>Expire Date: {!validDate && <span className='payment-form__alert-message'>invalid date</span>}</label>
                <input className='payment-form__input' type="text" id="expirationDate" placeholder='expire date...' value={date} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleDateChange(e); validateExpirationDate(e.target.value)}}/>
            </div>
            <div className="payment-form__col">
                <label htmlFor="cvv" className='payment-form__label'><span className='payment-form__asterisk'>*</span>CVV: {!validCvv && <span className='payment-form__alert-message'>invalid cvv</span>}</label>
                <input className='payment-form__input' type="text" id="cvv" placeholder='cvv...' value={cvv} disabled={!cardNumber || !validCardNumber? true : false} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setCvv); validateCvv(e.target.value)}}/>
            </div>
        </div>

        <p className='payment-form__message'>Fields with <span className='payment-form__asterisk'>*</span> are mandatory</p>
        <div className='payment-form__row'>
        <button className='payment-form__button' type='button' tabIndex={!active? -1 : 0} onClick={() => previousStep()}>Previous Step</button>
        <button className='payment-form__button' type="submit" disabled={!validForm} tabIndex={!active? -1 : 0}>Next Step</button>
        </div>
    </form>
    );
}

 export default PaymentForm;