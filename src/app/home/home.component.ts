import {Component, forwardRef} from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { FakeData } from "@/_helpers";
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Document } from "@/_models";
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from "@/_services/storage.service";

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['../app.component.css', 'home.component.css']
})
export class HomeComponent {
    storageService: StorageService;
    currentUser: User;
    users: User[] = [];
    pic_write = "/src/assets/img/write.png";
    pic_logo = "/src/assets/img/logo-dark-blue.svg";
    pic_profil = "src/assets/img/profil.png";
    displayEditor = true;
    
    // for editor
    tempDocAttributes = {title: 'Neue Dokument', id: 'kein', ref: 'kein', start: 'kein', end: 'kein', lawyer: 'kein', client: 'kein'};
    fakeData: FakeData;
    id: string;
    public Editor = DecoupledEditor;
    public isDisabled = true;

    public editorData = localStorage.getItem('tempDoc') != null ? localStorage.getItem('tempDoc') : '';

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        storageService: StorageService,
        config: NgbPopoverConfig
        ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        // for editor
        this.id = "1";
        this.fakeData = new FakeData();
        config.placement = 'right';
        config.triggers = 'hover';
        this.storageService = storageService;
    }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });

        // for editor
        // this.document = this.fakeData.documents.find(a => a.id == this.id);
        // this.tempDocAttributes = localStorage.getItem('tempAttr') != null ? JSON.parse(localStorage.getItem('tempAttr')) : this.tempDocAttributes;
        //this.tempDoc = localStorage.getItem('tempDoc') != null ? localStorage.getItem('tempDoc') : '';
        // this.fileString = '<div><h1>' + this.tempDocAttributes.title + '</h1></div>\n' +
        //     '    <table class="table table-hover">\n' +
        //     '        <tr>\n' +
        //     '            <td><strong>ID: </strong>' + this.tempDocAttributes.id + '</td>\n' +
        //     '            <td><strong>Referenz: </strong>' + this.tempDocAttributes.ref+ '</td>\n' +
        //     '        </tr>\n' +
        //     '        <tr>\n' +
        //     '            <td><strong>Anfangsdatum: </strong>' + this.tempDocAttributes.start + '</td>\n' +
        //     '            <td><strong>Enddatum: </strong>' + this.tempDocAttributes.end + '</td>\n' +
        //     '        </tr>\n' +
        //     '        <tr>\n' +
        //     '            <td><strong>Rechtsanwalt: </strong>' + this.tempDocAttributes.lawyer + '</td>\n' +
        //     '            <td><strong>Kunden: </strong>' + this.tempDocAttributes.client + '</td>\n' +
        //     '        </tr>\n' +
        //     '    </table>\n' +
        //     '    <div>\n' +
        //     '        <p>{{tempDoc}}</p>\n' +
        //     '    </div>';
        this.router.navigate(['/home/dashboard']);
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
        this.displayEditor = !this.displayEditor;
        // console.log(this.editorDisplay);
    }

    hoverUser() {
        console.log('hoverUser');
        document.getElementById('dropdown-content').style.display = "block";
    }

    outUser() {
        document.getElementById('dropdown-content').style.display = "none";
    }
}

export var homeProvider = {
    provide: HomeComponent,
    useExisting: forwardRef(function () { return HomeComponent; })
};