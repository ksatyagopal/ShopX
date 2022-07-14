import { Cart } from "./Cart";
import { Offer } from "./Offer";
import { OrderItem } from "./OrderItem";
import { ProductStorage } from "./ProductStorage";
import { Rating } from "./Rating";


export class Product {
    productId: number;
    productName: string;
    imageUrl: string;
    pdescription: string;
    category: string;
    price: number | null;
    active: string;
    createdOn: string | null;
    modifiedOn: string | null;
    carts: Cart[];
    offers: Offer[];
    orderItems: OrderItem[];
    ratings: Rating[];
    storages: ProductStorage[];
}