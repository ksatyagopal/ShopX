import { Admin } from "./Admin";

export class Contribution {
    cid: number;
    changeMadeBy: number | null;
    reference: string;
    changesMade: string;
    changedTime: string;
    reason: string;
    changeMadeByNavigation: Admin;
}