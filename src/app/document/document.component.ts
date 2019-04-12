import {Component, OnInit} from '@angular/core';
import { FakeData } from  '../_helpers';

@Component({
    templateUrl: 'document.component.html',
    styleUrls: ['../app.component.css', './document.component.css']
})

export class DocumentComponent implements OnInit{
    fake: FakeData;

    constructor() {
    }

    ngOnInit() {
        this.fake = new FakeData();
    }
}