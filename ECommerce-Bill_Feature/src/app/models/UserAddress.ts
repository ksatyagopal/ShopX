import { User } from "./User";
import { Order } from "./Order";

export class UserAddress {
    id: number;
    userId: number | null;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    mobile: string;
    mailId: string;
    contactPerson: string;
    user: User;
    orders: Order[];
}