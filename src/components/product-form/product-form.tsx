import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './styles.scss';

interface productInterface {
    id: number | undefined,
    name: string,
    path: string,
    description: string,
    price: string,
    image: string,
    category: string,
}

interface ProductFormProps {
    product?: productInterface;
    applyChanges: (product: productInterface) => void;
    cancel: () => void;
}


const ProductForm:React.FC<ProductFormProps> = ({product, applyChanges, cancel}) => {

    const [name, setName] = useState<string>(product?.name || '');
    const [path, setPath] = useState<string>(product?.path || '');
    const [description, setDescription] = useState<string >(product?.description || '');
    const [price, setPrice] = useState<string >(product?.price || '');
    const [image, setImage] = useState<string >(product?.image || '');
    const [category, setCategory] = useState<string >(product?.category || '');
    const [validForm, setValidForm] = useState<boolean>(false);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setText: (text:string) => void) => {
        setText(e.target.value);
    }

    const handlePathAndImageChange = (e: ChangeEvent<HTMLInputElement>, setText: (text:string) => void) => {
        setText(e.target.value.replace(/\s+/g, '-'));
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>,) => {
        if(/^[0-9]+$/.test(e.target.value) || e.target.value == ''){
            setPrice(e.target.value);
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(validForm){
            const editedProduct: productInterface = {
                id: product?.id,
                name: name!,
                path: path!,
                description: description!,
                price: price!,
                image: image!,
                category: category!
            }
            applyChanges(editedProduct);
        }
    }

    const validateForm = () => {
        setValidForm(name && path && description && price && image && category? true : false);
    }

    useEffect(() => {
        validateForm();
    },[name, path, description, price, image, category]);

    return(
    <form className="product-form section__subsection" onSubmit={handleSubmit}>
        <h2 className='product-form__title'>{`${product? 'Edit' : 'Create'} Product:`}</h2>
        <div className='product-form__row'>
            <div className="product-form__col">
                <label htmlFor="productName" className='product-form__label'>Name: {name == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <input className='product-form__input' type="text" id="productName" placeholder='name...' value={name} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setName);}}/>
            </div>
            <div className="product-form__col">
                <label htmlFor="productPrice" className='product-form__label'>Price in $: {price == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <input className='product-form__input' type="text" id="productPrice" placeholder='price...' value={price} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handlePriceChange(e)}}/>
            </div>
        </div>

        <div className='product-form__row'>
            <div className="product-form__col">
                <label htmlFor="productDescription" className='product-form__label'>Description: {description == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <textarea className='product-form__input product-form__text-area' id="productDescription" placeholder='description...' value={description} onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> {handleTextChange(e, setDescription);}}/>
            </div>
            <div className="product-form__col product-form__col--small">
                <label htmlFor="productCategory" className='product-form__label'>Category: {category == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <input className='product-form__input' type="text" id="productCategory" placeholder='category...' value={category} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handleTextChange(e, setCategory);}}/>
            </div>
        </div>

        <div className='product-form__row'>
            <div className="product-form__col">
                <label htmlFor="productPath" className='product-form__label'>URL Path: {path == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <input className='product-form__input' type="text" id="productPath" placeholder='url path...' value={path} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handlePathAndImageChange(e, setPath);}}/>
            </div>
            <div className="product-form__col">
                <label htmlFor="productImage" className='product-form__label'>Image: {image == '' && <span className='product-form__alert-message'>empty field</span>}</label>
                <input className='product-form__input' type="text" id="productImage" placeholder='image...' value={image} onChange={(e:ChangeEvent<HTMLInputElement>)=> {handlePathAndImageChange(e, setImage);}}/>
            </div>
        </div>

        <div className='payment-form__row'>
            <button className='payment-form__button' type="submit" disabled={!validForm} >{`${product? 'Apply Changes' : 'Create Product'}`}</button>
            <button className='payment-form__button' type='button' onClick={cancel}>Cancel</button>
        </div>
    </form>
    );
}

 export default ProductForm;