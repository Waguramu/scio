import {Attachments} from "@/_models/attachments";

export class Client {
    id: string;
    firstName: string;
    lastName: string;
    birthday: string;
    address: string;
    email: string;
    phone: string;
    attachments: Attachments;
}