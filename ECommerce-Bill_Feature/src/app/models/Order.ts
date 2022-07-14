import { UserAddress } from "./UserAddress";
import { Offer } from "./Offer";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

export class Order {
    orderId: number;
    userId: number | null;
    distinctItems: number | null;
    totalAmount: number | null;
    paymentType: string;
    paymentId: string;
    offerId: number | null;
    orderedOn: string | null;
    isCancelled: boolean | null;
    deliveryAddress: number | null;
    deliveryDate: string | null;
    orderStatus: string;
    deliveryAddressNavigation: UserAddress;
    offer: Offer;
    user: User;
    orderItems: OrderItem[];
}