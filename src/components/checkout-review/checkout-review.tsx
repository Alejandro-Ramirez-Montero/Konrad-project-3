import './styles.scss';
import { checkoutState } from '../../states/checkout-state';
import { useRecoilValue } from 'recoil';

interface PaymentFormProps {
    previousStep: () => void;
    pay: () => void;
    active: boolean;
    subtotal: number;
    total: number;
}

interface CheckoutInterface {
    province: string | undefined;
    city: string | undefined;
    address1: string | undefined;
    address2: string | undefined;
    zipCode: number | undefined;
    cardNumber: number | undefined;
}

const CheckoutReview:React.FC<PaymentFormProps> = ({previousStep, pay, active, subtotal, total}) => {
    const checkoutInfo = useRecoilValue<CheckoutInterface>(checkoutState);

    const maskCreditCard = (cardNumber: number | undefined) => {
        if(cardNumber){
            const card = cardNumber.toString();
            if (card.length <= 4) {
              return card;
            }
            
            const maskedSection = card.slice(0, -4).replace(/\d/g, '*');
            const visibleSection = card.slice(-4);
            
            return maskedSection + visibleSection;
        }
      }

    return(
    <div className="checkout-review section__subsection">
        <div className='checkout-review__col'>
            <div className='checkout-review__subtitle'>Ship to:</div>
            <div className='checkout-review__subsection'>
                <div>City: {`${checkoutInfo.city}, ${checkoutInfo.province}`}</div>
                <div>Address: {`${checkoutInfo.address1}`}</div>
            </div>
        </div>

        <div className='checkout-review__col'>
            <div className='checkout-review__subtitle'>Payment:</div>
            <div className='checkout-review__subsection'>
                <div>Card: {`${maskCreditCard(checkoutInfo.cardNumber)}`}</div>
            </div>
        </div>

        <div className='checkout-review__row checkout-review__row--flex-grow checkout-review__row--margin-horizontal'>
            <div className='checkout-review__col checkout-review__col--flex-grow checkout-review__col--dark-bg checkout-review__col--padding'>
                <div className='checkout-review__div-flex'>Subtotal: <span className='checkout-review__text-right'> {`$${subtotal}`} </span></div>
                <div className='checkout-review__div-flex'>Shipping: <span className='checkout-review__text-right'> {`$5.00`} </span></div>
                <div className='checkout-review__div-flex'>Taxes: <span className='checkout-review__text-right'> 13% </span></div>
            </div>
            <div className='checkout-review__col checkout-review__col--flex-grow checkout-review__col--padding'>
                <div className='checkout-review__subtitle'>Total:</div>
                <div className='checkout-review__subsection checkout-review__subsection--medium-font'>
                    <div>{`$${total}`}</div>
                </div>
            </div>

        </div>

        <div className='checkout-review__row checkout-review__row--margin-bottom'>
        <button className='checkout-review__button' type='button' tabIndex={!active? -1 : 0} onClick={() => previousStep()}>Previous Step</button>
        <button className='checkout-review__button checkout-review__button--black' type='button' tabIndex={!active? -1 : 0} onClick={() => pay()}>Pay</button>
        </div>
    </div>
    );
}

 export default CheckoutReview;