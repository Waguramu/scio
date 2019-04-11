import { Component } from '@angular/core';
import { FakeData } from  '../_helpers';

@Component({
    templateUrl: 'document.component.html',
})

export class DocumentComponent {
    fake: FakeData;

    constructor() {
        this.fake = new FakeData();

    }


}