import './products-list.scss'
import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { useNavigate } from 'react-router-dom';

import Section from '../../components/section/section'
import Dropdown from '../../components/dropdown/dropdown';
import List from '../../components/List/list';
import Pagination from '../../components/pagination/pagination';
import Searchbar from '../../components/search-bar/search-bar';

import { productsListState } from '../../states/products-list-state';

interface productInterface {
  name: string,
  path: string,
  description: string,
  price: string,
  image: string,
  categories: Array<string>,
}

interface filtersInterface {
  category: string,
  order: string,
  sort: string,
  priceRange: string,
}

interface pageInterface {
  itemsPerPage: number,
  currentPage: number,
  lastPage: number,
}

function ProductsList() {
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState<Array<productInterface>>();
  const [activeList, setActiveList] = useState<Array<productInterface>>([]);
  const [page, setPage] = useState<pageInterface>({itemsPerPage: 10, currentPage: 0, lastPage: 0});
  const [categories, setCategories] = useState<Array<string>>([]);
  const [filters, setFilters] = useState<filtersInterface>({category: '', order: 'Price', sort:'Ascending', priceRange:''});
  const [search, setSearch] = useState<string>('');
  const [clearFilters, setClearFilters] = useState<boolean>(false);

  const [filteredList, setFilteredList] = useRecoilState<{productsList: Array<productInterface>}>(productsListState);

  const getProducts = () => {
    fetch('../../../public/products.json')
    .then(response => response.json())
    .then((data: Array<productInterface>) => {
      setProductsList(data);
      console.log(data);
    })
    .catch();
  }

  const getCategories = () => {
    let categoriesList:Array<string> = [];
    productsList?.map((product) => {
      if(!categoriesList.includes(product.categories[0])){
        categoriesList.push(product.categories[0]);
      }
      setCategories(categoriesList);
    });
  }

  const addFilter = (field:string, option:string) => {
    if(field === 'category' || field === 'order' || field === 'sort' || field === 'priceRange'){
      if(filters[field] !== option){
        setFilters({...filters, [field]: option});
      }
    }
  }

  const applyFilters = () => {
    let filteredProducts = productsList?.slice();
    if(search !== ''){
      filteredProducts = filteredProducts?.filter(product => product.name.toLowerCase().includes(search));
    }
    else{
      if(filters.category !== ''){
        filteredProducts = filteredProducts?.filter(product => product.categories[0] === filters.category);
      }
      if(filters.priceRange !== ''){
        let priceRange = getPriceRange();
        filteredProducts = filteredProducts?.filter(product => {
          let productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
          if(priceRange? priceRange.length >= 2 : false){
            return productPrice >= priceRange![0] && productPrice <= priceRange![1];
          }
          else{
            if(priceRange){
              return productPrice >= priceRange![0];
            }
          }
        });
      }
      if(filters.sort === 'Ascending'){
        if(filters.order === 'Name'){
          filteredProducts?.sort((a:productInterface, b:productInterface) => a.name.localeCompare(b.name));
        }
        else{
          filteredProducts?.sort((a:productInterface, b:productInterface) => Number(a.price) - Number(b.price));
        }
      }
      else{
        if(filters.order === 'Name'){
          filteredProducts?.sort((a:productInterface, b:productInterface) => b.name.localeCompare(a.name));
        }
        else{
          filteredProducts?.sort((a:productInterface, b:productInterface) => Number(b.price) - Number(a.price));
        }
      }
    }
    setFilteredList({productsList: filteredProducts? filteredProducts : []});
  }

  const setLastPage = () => {
    let lastPage:number =  Math.floor(filteredList.productsList.length / page.itemsPerPage);
    lastPage += (filteredList.productsList.length % page.itemsPerPage > 0)? 1 : 0;
    setPage({...page, lastPage: lastPage - 1, currentPage: 0});
  }

  const setCurrentPage = (newCurrentPage:number) => {
    setPage({...page, currentPage: newCurrentPage});
  }

  const showProduct = (productPath:string) => {
    navigate('/product-details/'+ productPath);
  }

  const handleClearFilters = () => {
    setSearch('');
    setClearFilters(!clearFilters);
  }

  const getPriceRange = () => {
    const range = filters.priceRange.match(/\d+(\.\d+)?/g)?.map(Number);
    return range
  }

  //Traerse la lista de productos
  useEffect(() =>{
    getProducts();
  },[]);

  //Obtener las categorias que existen en la lista de productos para agregarlos al dropdown de categorias
  useEffect(() =>{
    if(productsList !== undefined){
      getCategories();
    }
  },[productsList]);

  //aplicar el filtro a la lista de productos que se le muestra al usuario
  useEffect(() =>{
    if(productsList !== undefined){
      applyFilters();
    }
  },[filters, productsList, search]);

  //Setea la ultima pagina de la lista cuando la lista filtrada cambia
  useEffect(() =>{
    setLastPage();
  },[filteredList]);

  //modificar la lista que esta activa en pantalla
  useEffect(() =>{
    setActiveList(filteredList.productsList.slice(page.currentPage * page.itemsPerPage, page.itemsPerPage * (page.currentPage+1)));
  },[page]);

  useEffect(() =>{
    setClearFilters(!clearFilters);
  },[search]);

  //limpiar los filtros
  useEffect(() =>{
    if(filters.category !== '' || filters.order !== 'Price' || filters.sort !== 'Ascending' || filters.priceRange !== ''){
      setFilters({category: '', order: 'Price', sort:'Ascending', priceRange: ''});
    }
  },[clearFilters]);

  return (
      <main className="main">
        <Section title='Our Products:' classes='section--fallen-tree-bg section--min-vh'>
          { productsList &&
            <>
              <div className="filters">
                <div className='filters__dropdowns-container'>
                  <Searchbar search={search} setSearch={setSearch}/>
                  <Dropdown title='Category' field='category' disabled={search !== ''? true : false} addFilter={addFilter} options={categories} clearFilter={clearFilters}/>
                  <Dropdown title='Order by' field='order' disabled={search !== ''? true : false} addFilter={addFilter} options={['Name', 'Price']} defaultOption='Price' clearFilter={clearFilters}/>
                  <Dropdown title='Sort' field='sort' disabled={search !== ''? true : false} addFilter={addFilter} options={['Ascending', 'Descending']} defaultOption='Ascending' clearFilter={clearFilters}/>
                  <Dropdown title='Price Range' field='priceRange' disabled={search !== ''? true : false} addFilter={addFilter} options={['$0 - $49.99', '$50 - $99.99', '$100 - $149.99', '$150+']} clearFilter={clearFilters}/>
                  <button className="filters-button filters-button--s-screen" onClick={handleClearFilters}>Clear Selection</button>
                </div>
                <button className="filters-button filters-button--m-screen" onClick={handleClearFilters/*hacer limpiado de filtros*/}>Clear Selection</button>
              </div>
              <List list={activeList} showProduct={showProduct}></List>
              <Pagination currentPage={page.currentPage} lastPage={page.lastPage} setCurrentPage={setCurrentPage}/>
            </>
          }
        </Section>
      </main>
  )
}

export default ProductsList
