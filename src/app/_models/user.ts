import { Subscription } from "@/_models/subscription";
import { History } from "@/_models/userhistory";
import { Attachments } from "@/_models/attachments";

export class User {
    id: string;
    password: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    subscription: Subscription;
    history: History;
    attachments: Attachments;
}