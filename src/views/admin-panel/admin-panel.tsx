import './admin-panel.scss'
import { useEffect, useState } from 'react';
import { cartNotificationState } from '../../states/cart-notification-state';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Section from '../../components/section/section'
import SimpleList from '../../components/simple-list/simple-list';
import { useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestAllProducts, requestCart, requestCreateProduct, requestDeleteProduct, requestRemoveProductFromCart, requestUpdateProduct, requestUpdateProductQuantityInCart } from '../../utils/functions';
import Table from '../../components/table/table';
import Modal from '../../components/modal/modal';
import ProductForm from '../../components/product-form/product-form';

interface productInterface {
  id: number | undefined,
  name: string,
  path: string,
  description: string,
  price: string,
  image: string,
  category: string,
}

function AdminPanel() {
  const columns = [
    { header: 'Id', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Category', accessor: 'category' },
  ];

  const [products, setProducts] = useState<Array<productInterface> | null>(null);
  const [productToEdit, setProductToEdit] = useState<productInterface>();
  const [productToCreate, setProductToCreate] = useState<productInterface>();
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [formMode, setformMode] = useState<boolean>(true);
  const navigate = useNavigate();

  const getProducts = () => {
    if(userToken){
      requestAllProducts(userToken)
      .then(productList => {
        setProducts(productList);
      })
      .catch();
    }
  }

  const deleteProduct = (productId: number) => {
    if(userToken && products){
      requestDeleteProduct(userToken, productId)
      .then(result => {
        if(result == 204){
          getProducts();
        }
      })
      .catch();
    }
  }

  const saveEditedProduct = (editedProduct : productInterface) => {
    if(userToken && editedProduct.id){
      requestUpdateProduct(userToken, editedProduct)
      .then(response => {
        if(response){
          setOpenModal(false);
          getProducts();
        }
      })
      .catch()
    }
  }

  const saveCreatedProduct = (productToCreate : productInterface) => {
    if(userToken){
      productToCreate.id = undefined;
      requestCreateProduct(userToken, productToCreate)
      .then(response => {
        if(response){
          setOpenModal(false);
          getProducts();
        }
      })
      .catch()

    }
  }

  const createProduct = () => {
    setformMode(true);
    setOpenModal(true);
  }

  const editProduct = (productId: number) => {
    if(products){
      setProductToEdit(products.find(p => p.id == productId));
      setformMode(false);
      setOpenModal(true);
    }
  }

  useEffect(() =>{
    getProducts();
  },[]);

  return (
      <main className="main">
        <h1 className='admin-panel__page-title'>Administrator Panel</h1>
        <Section title='Manage Products:' classes='section--woods-bg section--h-hundred'>
          <button className='admin-panel__button' onClick={() => createProduct()}> Add New Product</button>
          {products &&
            <Table columns={columns} data={products} edit={editProduct} deleteRow={deleteProduct}/>
          } 
        </Section>
        <Section title='Cart:' classes='section--logo-light-green section--vh'>
          
        </Section>
        <Modal openModal={openModal}>
          { formMode?
            <ProductForm applyChanges={saveCreatedProduct} cancel={() => setOpenModal(false)}/>
            :
            <ProductForm product={productToEdit} applyChanges={saveEditedProduct} cancel={() => setOpenModal(false)}/>
          }
        </Modal>
      </main>
  )
}

export default AdminPanel
