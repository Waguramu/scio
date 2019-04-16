import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    heading: string;
    content: any;

    constructor(public modalRef: MDBModalRef) {}

}