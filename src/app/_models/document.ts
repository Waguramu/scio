import { User } from "@/_models/user"

export class Document {
    creator: User;
    date: string;
    title: string;
    annotations: [string];
    keypoints: [string];
    file: string;
}