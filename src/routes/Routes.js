import Products from '../products/Products';
import ProductForm from '../products/ProductForm';
import Transactions from "../bank/Transactions";
import Categories from '../categories/Categories';
import Uploads from '../uploads/Uploads';
import UploadTransactions from '../bank/UploadedTransactions';

export default Object.freeze([
  {
    path: '/products/new',
    component: ProductForm,
  },
  {
    path: '/products/:id',
    component: ProductForm,
  },
  {
    path: '/products',
    component: Products,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/categories',
    component: Categories,
  },
  {
    path: '/uploads',
    component: Uploads,
    exact: true,
  },
  {
    path: '/uploads/:id',
    component: UploadTransactions,
  },
]);