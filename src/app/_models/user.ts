import { Subscription } from "@/_models/subscription";
import { History } from "@/_models/userhistory";
import { Attachments } from "@/_models/attachments";

export class User {
    id: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    birthday: string;
    subscription: Subscription;
    history: History;
    attachments: Attachments;
}