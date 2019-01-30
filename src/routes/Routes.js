import Transactions from "../bank/Transactions";
import Categories from '../categories/Categories';
import Uploads from '../uploads/Uploads';
import UploadedTransactions from '../bank/UploadedTransactions';
import SubmitFileForm from '../bank/SubmitFileForm';
import Categorized from '../categorized/Categorized';

export default Object.freeze([
  {
    path: '/',
    component: SubmitFileForm,
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
  },
  {
    path: '/uploads/:id',
    component: UploadedTransactions,
  },
  {
    path: '/uploads/:id/categorized',
    component: Categorized,
  },
]);