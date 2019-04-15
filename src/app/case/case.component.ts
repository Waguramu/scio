import {Collection, Document} from "@/_models";
import { FakeData } from "@/_helpers";
import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'modal-form',
    templateUrl: 'case.component.html',
    styleUrls: ['case.component.css']
})
export class CaseComponent {
    subscriptionFormModalEmail = new FormControl('', Validators.email);
    fakeData: FakeData;
    id: string;
    documents: Document[];
    case: Collection;
    isCollapsed = false;
    annotations: string[];
    attachments = [];

    constructor(
        private router: Router
    ){
        this.id = "1";
        this.fakeData = new FakeData();

    };

    ngOnInit() {
        this.case = this.fakeData.collections.find(a => a.id == this.id);
        this.getMemos();
        this.attachments = ['/src/assets/pdf/BDSG.pdf','/src/assets/pdf/BImSchG.pdf'];
    }

    getMemos() {
        this.documents = [];
        for (let document of this.case.documents) {
            this.documents.push(this.fakeData.documents[document.id]);
        }

        this.annotations = [...new Set(...this.documents.map(a => a.annotations))];
    }

    viewFile(src: string) {
        localStorage.setItem("file_src", src);
        this.router.navigate(['/home/viewer']);
    }

    sendEmail() {

    }

}