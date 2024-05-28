import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styles.scss';
import { checkoutState } from '../../states/checkout-state';
import { useSetRecoilState } from 'recoil';

interface ShippingFormProps {
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

const ShippingForm:React.FC<ShippingFormProps> = ({nextStep, active}) => {
    const setCheckoutInfo = useSetRecoilState<CheckoutInterface>(checkoutState);

    const [address1, setAddress1] = useState<string>('');
    const [address2, setAddress2] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [province, setProvince] = useState<string>('San Jose');
    const [zipCode, setZipCode] = useState<string>('');

    const [validZipCode, setValidZipCode] = useState<boolean>(true);
    const [validForm, setValidForm] = useState<boolean>(false);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setText: (text:string) => void) => {
        setText(e.target.value);
    }

    const validateZipCode = (zipCodeText: string) => {
        setValidZipCode(/^[0-6]\d{4}$/.test(zipCodeText));
    }

    const saveShippinginfo = () => {
        setCheckoutInfo((checkoutInfo) => ({
            ...checkoutInfo,
            address1: address1,
            address2: address2,
            city: city,
            province: province,
            zipCode: parseInt(zipCode, 10),
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(validForm){
            saveShippinginfo();
            nextStep();
        }
    }

    const validateForm = () => {
        setValidForm(address1 && city && province && zipCode && validZipCode? true : false);
    }

    useEffect(() => {
        validateForm();
    },[address1, city, province, zipCode]);


    return(
    <form className="shipping-form section__subsection" onSubmit={handleSubmit}>
        <div className='shipping-form__row'>
            <div className="shipping-form__col">
                <label htmlFor="province" className='shipping-form__label'><span className='shipping-form__asterisk'>*</span>Province:</label>

            <select
                  className="shipping-form__input"
                  name="wishlist-select-size"
                  id="wishlist-select-size"
                  value={province}
                  tabIndex={!active? -1 : 0}
                  onChange={(e:ChangeEvent<HTMLSelectElement>)=> handleTextChange(e, setProvince)}
                >
                  <option value='San Jose' aria-label={'San Jose'}>San Jose</option>
                  <option value='Guanacaste' aria-label={'Guanacaste'}>Guanacaste</option>
                  <option value='Puntarenas' aria-label={'Puntarenas'}>Puntarenas</option>
                  <option value='Cartago' aria-label={'Cartago'}>Cartago</option>
                  <option value='Alajuela' aria-label={'Alajuela'}>Alajuela</option>
                  <option value='Heredia' aria-label={'Heredia'}>Heredia</option>
                  <option value='Limon' aria-label={'Limon'}>Limon</option>
            </select>
            </div>
            <div className="shipping-form__col">
                <label htmlFor="city" className='shipping-form__label'><span className='shipping-form__asterisk'>*</span>City:</label>
                <input className='shipping-form__input' type="text" id="city" placeholder='city...' value={city} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> handleTextChange(e, setCity)}/>
            </div>
        </div>
        <div className='shipping-form__row'>
            <div className="shipping-form__col">
                <label htmlFor="address1" className='shipping-form__label'><span className='shipping-form__asterisk'>*</span>Address1:</label>
                <input className='shipping-form__input' type="text" id="addess1" placeholder='address 1...' value={address1} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> handleTextChange(e, setAddress1)}/>
            </div>
            <div className="shipping-form__col">
                <label htmlFor="address2">Address2:</label>
                <input className='shipping-form__input' type="text" id="addess2" placeholder='address 2...' value={address2} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> handleTextChange(e, setAddress2)}/>
            </div>
        </div>
        <div className='shipping-form__row'>
            <div className="shipping-form__col">
                <label htmlFor="zipCode" className='shipping-form__label'><span className='shipping-form__asterisk'>*</span>Zip Code: {!validZipCode && <span className='shipping-form__alert-message'>invalid zip code</span>}</label>
                <input className='shipping-form__input' type="text" id="zipCode" placeholder='zip code...' value={zipCode} tabIndex={!active? -1 : 0} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setZipCode); validateZipCode(e.target.value)}}/>
            </div>
            <div className="shipping-form__col"></div>
        </div>

        <p className='shipping-form__message'>Fields with <span className='shipping-form__asterisk'>*</span> are mandatory</p>
        <button className='shipping-form__button' type="submit" disabled={!validForm} tabIndex={!active? -1 : 0}>Next Step</button>
    </form>
    );
}

 export default ShippingForm;