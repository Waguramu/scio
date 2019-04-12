import {Component, OnInit} from '@angular/core';
import { FakeData } from  '../_helpers';

@Component({
    templateUrl: 'user.component.html',
    styleUrls: ['../app.component.css']
})

export class UserComponent implements OnInit{
    fake: FakeData;

    constructor() {
    }

    ngOnInit() {
        this.fake = new FakeData();
    }
}