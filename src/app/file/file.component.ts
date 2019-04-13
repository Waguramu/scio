import { Document } from "@/_models";
import { FakeData } from "@/_helpers";
import { Component } from "@angular/core";
import {first} from "rxjs/operators";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


@Component({
    templateUrl: 'file.component.html'
})
export class FileComponent {
    fakeData: FakeData;
    id: string;
    document: Document;
    fileString: string;

    public Editor = DecoupledEditor;
    public isDisabled = true;

    public onReady( editor ) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    };

    toggleDisabled() {
        this.isDisabled = !this.isDisabled
    };

    constructor(){
        this.id = "1";
        this.fakeData = new FakeData();

    };

    ngOnInit() {
        this.document = this.fakeData.documents.find(a => a.id == this.id);
        this.fileString = '<div><h1>' + this.document.title + '</h1></div>\n' +
            '    <table class="table table-hover">\n' +
            '        <tr>\n' +
            '            <td><strong>ID: </strong>' + this.document.id + '</td>\n' +
            '            <td><strong>Referenz: </strong>German Export Law</td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td><strong>Anfangsdatum: </strong>01.02.2018</td>\n' +
            '            <td><strong>Enddatum: </strong>20.05.2018</td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td><strong>Rechtsanwalt: </strong>x</td>\n' +
            '            <td><strong>Kunden: </strong>x</td>\n' +
            '        </tr>\n' +
            '    </table>\n' +
            '    <div>\n' +
            '        <p>' + this.document.file + '</p>\n' +
            '    </div>';
    }
}