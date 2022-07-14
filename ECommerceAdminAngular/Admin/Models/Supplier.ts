import { ProductStorage } from "./ProductStorage";

export class Supplier {
    supplierId: number;
    supplierName: string;
    slocation: string;
    storages: ProductStorage[];
}