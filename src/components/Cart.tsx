import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  HiMinus,
  HiOutlinePlus,
  HiOutlineShoppingCart,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addToCart,
  deleteToCart,
  removeToCart,
} from '@/redux/features/cart/cartSlice';
import { IProduct } from '@/types/globalTypes';

export default function Cart() {
  const { products, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiOutlineShoppingCart size="25" />
          <span>{products?.length || 0}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <h1>Total: {totalPrice.toFixed(2)}</h1>
        </SheetHeader>
        <div className="space-y-5">
          {products.map((product: IProduct) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product.name}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product?.name}</h1>
                <p>Quantity: {product.quantity}</p>
                <p className="text-xl">
                  Total Price: {(product.price * product.quantity!).toFixed(2)}{' '}
                  $
                </p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button onClick={() => dispatch(addToCart(product))}>
                  <HiOutlinePlus size="20" />
                </Button>
                <Button onClick={() => dispatch(removeToCart(product))}>
                  <HiMinus size="20" />
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => dispatch(deleteToCart(product))}
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
