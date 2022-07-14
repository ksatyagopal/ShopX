import { Product } from "./Product";
import { User } from "./User";

export class Rating {
    id: number;
    productId: number | null;
    rating1: number | null;
    userId: number | null;
    review: string;
    product: Product;
    user: User;
}