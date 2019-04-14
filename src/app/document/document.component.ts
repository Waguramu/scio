import {Component, OnInit} from '@angular/core';

@Component({
    templateUrl: 'document.component.html',
    styleUrls: ['../app.component.css', './document.component.css']
})
export class DocumentComponent implements OnInit{
    bgGrayBool:boolean = false;

    constructor() {

    }

    ngOnInit() {
    }


}