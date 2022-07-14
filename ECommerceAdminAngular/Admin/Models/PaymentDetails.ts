export class PaymentDetail {
    paymentId: number;
    amount: number | null;
    provider: string;
    paymentStatus: boolean | null;
    isPending: boolean | null;
    createdOn: string | null;
    reason: string;
}