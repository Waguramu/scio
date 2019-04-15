import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { FakeData } from "@/_helpers";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Document} from "@/_models";
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['../app.component.css', 'home.component.css']
})
export class HomeComponent {
    currentUser: User;
    users: User[] = [];
    pic_write = "/src/assets/img/write.png";
    displayEditor = false;

    // for editor
    fakeData: FakeData;
    id: string;
    document: Document;
    fileString: string;
    public Editor = DecoupledEditor;
    public isDisabled = true;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        config: NgbPopoverConfig
        ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        // for editor
        this.id = "1";
        this.fakeData = new FakeData();
        config.placement = 'right';
        config.triggers = 'hover';
    }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });

        // for editor
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


    // for editor
    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }
    toggleDisabled() {
        this.isDisabled = !this.isDisabled
    };

    /*
    elements: any = [
        {date: "08.04.2019", name: 'Mark Otto', email: 'mark.otto@gmail.com', text: "My neighbour shits in my garden every weekend!"},
        {date: "08.04.2019", name: 'Axel Müller', email: 'axel@gmx.de', text: "I bumped my car!"},
        {date: "08.04.2019", name: 'Marina Steinmeier', email: 'mst@yahoo.jp', text: "I lost all my money to a Nigerian prince"}
    ];

    headElements = ['Date', 'Name', 'Email', 'Message'];
*/

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    toggle() {
        if (this.displayEditor == false) {
            this.displayEditor = true;
        } else {
            this.displayEditor = false;
        }
        // console.log(this.editorDisplay);
    }
}