import { Document } from "@/_models/document";
import { User } from "@/_models/user"

export class Collection {
    creator: User;
    date: string;
    title: string;
    annotations: [string];
    summary: string;
    documents: [Document];
}