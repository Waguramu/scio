import {Component, OnInit} from '@angular/core';
import { FakeData } from  '../_helpers';
import { AuthenticationService } from "@/_services";
import {User} from "@/_models";
import {Document} from "@/_models";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'user.component.html',
    styleUrls: ['../app.component.css', 'user.component.css']
})

export class UserComponent implements OnInit{
    pic_search = "/src/assets/img/loupe-w.png";
    pic_profil = "src/assets/img/profil.png";
    pic_case = "/src/assets/img/folder.png";
    bgGrayBool:boolean = false;
    fakeData: FakeData;
    currentUser: User;
    document: Document[];
    collection: {};
    collection_include_docu: number;

    heading1 = "Heading1";
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        console.log('User getAll()');
        console.log(this.authenticationService.currentUser);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.fakeData = new FakeData();
        this.document = this.fakeData.documents;

        this.collection = this.fakeData.collections[0];
        this.collection_include_docu = this.fakeData.collections[0]['documents'].length;

        // console.log(this.fakeData.collections[0]['documents']);
    }


    /* tabs */
    openTab(tabName) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", " ");
        }
        document.getElementById(tabName).style.display = "block";

        if(tabName == 'tab-case') {
            this.bgGrayBool = true;
        }
        if(tabName == 'tab-docu') {
            this.bgGrayBool = false;
        }

        // console.log(this.bgGrayBool);
    };

    openMemo() {
        this.router.navigate(['../../home/memo']);
    }
}