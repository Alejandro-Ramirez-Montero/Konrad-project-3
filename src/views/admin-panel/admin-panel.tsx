import './admin-panel.scss'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Section from '../../components/section/section'
import { useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestAllOrders, requestAllProducts, requestCreateProduct, requestDeleteProduct, requestUpdateProduct } from '../../utils/functions';
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

interface orderInterface {
  address1: string,
  address2: string | undefined,
  cardNumber: string,
  shipping: string,
  date: string,
  id: number,
  status: string,
  total: number,
  zipCode: string,
  email: string,
  fullName: string
}

function AdminPanel() {
  const productColumns = [
    { header: 'Id', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: 'price' },
    { header: 'Category', accessor: 'category' },
  ];

  const orderHistoryColumns = [
    { header: 'Id', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Client', accessor: 'email' },
    { header: 'Shipping', accessor: 'shipping' },
    { header: 'Zip Code', accessor: 'zipCode' },
    { header: 'Total', accessor: 'total' },
    { header: 'Status', accessor: 'status' },
  ];
  const statusOptions = ['Cancelled', 'Pending', 'Confirmed'];

  const [products, setProducts] = useState<Array<productInterface> | null>(null);
  const [orderHistory, setOrderHistory] = useState<Array<orderInterface> | null>(null);
  const [productToEdit, setProductToEdit] = useState<productInterface>();
  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [formMode, setformMode] = useState<boolean>(true);
  const navigate = useNavigate();

  const getProducts = () => {
    if(userToken){
      requestAllProducts()
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

  const getOrderHistory = () => {
    if(userToken){
      requestAllOrders(userToken)
      .then(orderList => {
        const orders: Array<orderInterface> = orderList.map((order: any) => ({
          address1: order.address1,
          address2: order?.address2,
          cardNumber: order.cardNumber,
          shipping: `${order.province}, ${order.city}`,
          date: order.date.split("T")[0],
          id: order.id,
          status: statusOptions[order.status],
          total: order.total,
          zipCode: order.zipCode,
          email: order.user.email,
          fullName: order.user.fullName
        }));
        setOrderHistory(orders.reverse());
      })
      .catch();
    }
  }

  useEffect(() =>{
    getProducts();
    getOrderHistory();
  },[]);

  return (
      <main className="main">
        <h1 className='admin-panel__page-title'>Administrator Panel</h1>
        <Section title='Manage Products:' classes='section--woods-bg'>
          <button className='admin-panel__button' onClick={() => createProduct()}> Add New Product</button>
          {products &&
            <Table columns={productColumns} data={products} edit={editProduct} deleteRow={deleteProduct}/>
          } 
        </Section>
        <Section title='Order History:' classes='section--brown'>
          {orderHistory &&
            <Table columns={orderHistoryColumns} data={orderHistory}/>
          } 
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
