import { Offer } from "./Offer";
import { Product } from "./Product";
import { User } from "./User";

export class Cart {
    id: number;
    userId: number | null;
    productId: number | null;
    productName: string;
    price: number | null;
    quantity: number | null;
    subTotal: number | null;
    isSelectedForOrder: boolean | null;
    offerId: number | null;
    offer: Offer;
    product: Product;
    user: User;
}