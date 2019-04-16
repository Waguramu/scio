import { Document } from "@/_models";
import { FakeData } from "@/_helpers";
import { Component } from "@angular/core";
import { first } from "rxjs/operators";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { StorageService } from "@/_services/storage.service";
import { AnnotationExtractionService } from "@/_services";
import { HomeComponent } from "@/home";
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalComponent } from "@/modal/modal.component";


@Component({
    selector: 'memo',
    templateUrl: 'memo.component.html'
})
export class MemoComponent {
    modalRef: MDBModalRef;
    storageService: StorageService;
    fakeData: FakeData;
    id: string;
    document: Document;
    fileString: string;
    referencedData = [];
    keys = [];
    home: HomeComponent;

    modalOptions = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: true,
        data: {
            heading: 'Extracted entities',
            content: [{ entity: 'Opfer', description: 'Konrad Klein'},
                { entity: 'Täter', description: 'Bernhard Vogel' },
                { entity: 'Objekt', description: 'gebrauchten Pkw' },
                { entity: 'Thema', description: ['Defekt', 'Personenkraftwagen', 'Reparatur', 'Rechnung'] },
                { entity: 'Ort', description: 'Augsburg' }]
        }
    }

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

    constructor(storageService: StorageService,
                home: HomeComponent,
                private modalService: MDBModalService){
        this.id = "1";
        this.fakeData = new FakeData();
        this.storageService = storageService;
        this.home = home;
    };

    ngOnInit() {
        this.document = this.fakeData.documents.find(a => a.id == this.id);
        this.extractParagraphsToHtml(this.document.file);
    }

    extractParagraphsToHtml(text: string) {
        let paragraphs = text.split('\n');
        // Extracting references per paragraph
        let mockrefs = ['BGB §308 Klauselverbote mit Wertungsmöglichkeit',
            'BGB §308 Klauselverbote mit Wertungsmöglichkeit',
            'BGB §308 Klauselverbote mit Wertungsmöglichkeit',
            'BGB §308 Klauselverbote mit Wertungsmöglichkeit',
            'BGB §308 Klauselverbote mit Wertungsmöglichkeit'];
        this.referencedData = [];
        for (let paragraph of paragraphs) {
            this.referencedData.push({paragraph: paragraph, ref: mockrefs[Math.floor((Math.random() * mockrefs.length))]});
        }

        this.keys = Array.from(this.referencedData.keys());
    }

    copyText(text: string) {
        localStorage.setItem('tempDoc', localStorage.getItem('tempDoc') != null ? localStorage.getItem('tempDoc') + '<p>' + text + '</p>':
                '<p>' + text + '</p>');
        this.home.editorData = localStorage.getItem('tempDoc');
        console.log(localStorage.getItem("tempDoc"))
    }

    extractEntities() {
        this.modalRef = this.modalRef = this.modalService.show(ModalComponent, this.modalOptions);
    }
}