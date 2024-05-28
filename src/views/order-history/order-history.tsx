import './order-history.scss'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Section from '../../components/section/section'
import { useNavigate } from 'react-router-dom';
import { userTokenState } from '../../states/user-token';
import { requestAllOrdersByUser } from '../../utils/functions';
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
  //city: string,
  shipping: string,
  date: string,
  id: number,
  //province: string,
  status: string,
  total: number,
  zipCode: string,
  email: string,
  fullName: string
}

function OrderHistory() {
  const columns = [
    { header: 'Id', accessor: 'id' },
    { header: 'Date', accessor: 'date' },
    { header: 'Shipping', accessor: 'shipping' },
    { header: 'Zip Code', accessor: 'zipCode' },
    { header: 'Total', accessor: 'total' },
    { header: 'Status', accessor: 'status' },
  ];
  const statusOptions = ['Cancelled', 'Pending', 'Confirmed'];

  const [userToken, setUserToken] = useRecoilState<string | undefined>(userTokenState);
  const [orderHistory, setOrderHistory] = useState<Array<orderInterface> | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getOrderHistory = () => {
    if(userToken){
      requestAllOrdersByUser(userToken)
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

  const createProduct = () => {
    setOpenModal(true);
  }

  useEffect(() =>{
    getOrderHistory();
  },[]);

  return (
      <main className="main">
        <Section title='Order History:' classes='section--woods-bg section--h-hundred'>
          {orderHistory &&
            <Table columns={columns} data={orderHistory}/>
          } 
        </Section>
        <Modal openModal={openModal}>
          {/* { formMode?
            <ProductForm applyChanges={saveCreatedProduct} cancel={() => setOpenModal(false)}/>
            :
            <ProductForm product={productToEdit} applyChanges={saveEditedProduct} cancel={() => setOpenModal(false)}/>
          } */}
        </Modal>
      </main>
  )
}

export default OrderHistory;
