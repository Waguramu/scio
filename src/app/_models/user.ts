﻿import { Subscription } from "@/_models/subscription";
import { History } from "@/_models/userhistory";
import { Attachments } from "@/_models/attachments";
import { Client } from "@/_models/client";

export class User {
    id: string;
    password: string;
    email: string;
    tel: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: string;
    photo: string;
    clients: Client[];
    subscription: Subscription;
    history: History;
    saved: Attachments;
    token?: string;
}