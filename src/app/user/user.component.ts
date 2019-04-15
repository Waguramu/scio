import {Component, OnInit} from '@angular/core';
import { FakeData } from  '../_helpers';
import { AuthenticationService } from "@/_services";
import {User} from "@/_models";

@Component({
    templateUrl: 'user.component.html',
    styleUrls: ['../app.component.css', 'user.component.css']
})

export class UserComponent implements OnInit{
    pic_search = "/src/assets/img/loupe-w.png";
    pic_profil = "src/assets/img/profil.png";
    bgGrayBool:boolean = false;
    fakeData: FakeData;
    currentUser: User;

    heading1 = "Heading1";
    constructor(private authenticationService: AuthenticationService ) {
        console.log('User getAll()');
        console.log(this.authenticationService.currentUser);
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.fakeData = new FakeData();
    }






    /* tabs */
    openTab(tabName) {
        var i, tabcontent, tablinks;
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


}