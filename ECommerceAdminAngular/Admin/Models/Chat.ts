import { Admin } from "./Admin";

export class Chat {
    chatId: number;
    messageFrom: number | null;
    messageTo: number | null;
    message: string;
    sentTime: string | null;
    isDeleted: boolean | null;
    isViewed: boolean | null;
    isCalled: boolean | null;
    messageFromNavigation: Admin;
    messageToNavigation: Admin;
}