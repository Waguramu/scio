import { Document } from "@/_models/document";
import { User } from "@/_models/user"

export class Collection {
    id: string;
    ref_id: string;
    reference: string;
    creator: User;
    date: string;
    title: string;
    summary: string;
    documents: Document[];
    attachments: string[];
}