import { Document } from "@/_models/document";
import { Collection } from "@/_models/collection";

export class History {
    id: string;
    documents: Document[];
    collections: Collection[];
}