import { Document } from "@/_models";
import { FakeData } from "@/_helpers";
import { Component } from "@angular/core";


@Component({
    templateUrl: 'file.component.html'
})
export class FileComponent {

    fakeData: FakeData;
    id: string;
    document: Document;

    constructor(){
        this.id = "1";
        this.fakeData = new FakeData();
        this.document = this.fakeData.documents.find(a => a.id == this.id);
    };




}