import { Offer } from "./Offer";
import { Order } from "./Order";
import { Product } from "./Product";

export class OrderItem {
    id: number;
    orderId: number | null;
    productId: number | null;
    productName: string;
    price: number | null;
    quantity: number | null;
    subTotal: number | null;
    offerId: number | null;
    isReturned: boolean | null;
    returnedOn: string | null;
    offer: Offer;
    order: Order;
    product: Product;
}