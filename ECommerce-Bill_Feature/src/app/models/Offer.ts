import { Product } from "./Product";
import { Cart } from "./Cart";
import { OrderItem } from "./OrderItem";
import { Order } from "./Order";

export class Offer {
    offerId: number;
    offerName: string;
    offerDescription: string;
    productId: number | null;
    discountPercentage: number | null;
    discountAmount: number | null;
    isActive: boolean | null;
    createdOn: string | null;
    modifiedOn: string | null;
    isDeleted: boolean | null;
    deletedOn: string | null;
    product: Product;
    carts: Cart[];
    orderItems: OrderItem[];
    orders: Order[];
}