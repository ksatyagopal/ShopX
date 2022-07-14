import { Chat } from "./Chat";
import { Contribution } from "./Contribution";

export class Admin {

    constructor(){
        this.adminId = 0;
        this.adminName = "";
        this.email = "";
        this.mobile = null;
        this.isSuperAdmin = false;
        this.lastLoggedIn = null;
        this.password = "";
        this.isLoggedIn = false;
        this.isDeleted = false;
        this.isLocked = false;
        this.unSuccessfulAttempts = 0;
        this.contributions = null;
    }

    adminId: number;
    adminName: string;
    email: string;
    mobile: number | null;
    isSuperAdmin: boolean | null;
    lastLoggedIn: string;
    password: string;
    isLoggedIn: boolean | null;
    isDeleted: boolean | null;
    isLocked: boolean | null;
    unSuccessfulAttempts: number | null;
    chatMessageFromNavigations: Chat[];
    chatMessageToNavigations: Chat[];
    contributions: Contribution[];
}