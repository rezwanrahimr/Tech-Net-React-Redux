import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import {
  useGetProductsQuery,
  useGetSingleProductQuery,
} from './redux/api/apiSlice';

function App() {
  const { data, error, isLoading } = useGetProductsQuery();
  const { data: asData } = useGetSingleProductQuery(2);
  // console.log(data);
  console.log(asData);
  // alert(error);
  isLoading && <div>Loading...</div>;
  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
