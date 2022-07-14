import { Cart } from "./Cart";
import { Order } from "./Order";
import { Rating } from "./Rating";
import { UserAddress } from "./UserAddress";

export class User {
    userId: number;
    firstName: string;
    lastName: string;
    mailId: string;
    mobile: string;
    password: string;
    createdOn: string | null;
    isActive: boolean | null;
    isDeleted: boolean | null;
    deletedOn: string | null;
    modifiedOn: string | null;
    isLoggedIn: boolean | null;
    lastLoggedIn: string | null;
    wantAlerts: boolean | null;
    carts: Cart[];
    orders: Order[];
    ratings: Rating[];
    userAddresses: UserAddress[];
}