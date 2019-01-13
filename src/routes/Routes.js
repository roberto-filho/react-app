import Transactions from "../bank/Transactions";
import Categories from '../categories/Categories';
import Uploads from '../uploads/Uploads';
import UploadedTransactions from '../bank/UploadedTransactions';
import SubmitFileForm from '../bank/SubmitFileForm';

export default Object.freeze([
  {
    path: '/',
    component: SubmitFileForm,
    exact: true,
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
    component: UploadedTransactions,
  },
]);