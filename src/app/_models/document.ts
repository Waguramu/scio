import { User } from "@/_models/user"

export class Document {
    id: string;
    creator: User;
    date: string;
    title: string;
    annotations: [string];
    keypoints: [string];
    file: string;
}