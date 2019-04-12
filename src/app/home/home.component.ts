import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private router: Router,
        ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    elements: any = [
        {date: "08.04.2019", name: 'Mark Otto', email: 'mark.otto@gmail.com', text: "My neighbour shits in my garden every weekend!"},
        {date: "08.04.2019", name: 'Axel Müller', email: 'axel@gmx.de', text: "I bumped my car!"},
        {date: "08.04.2019", name: 'Marina Steinmeier', email: 'mst@yahoo.jp', text: "I lost all my money to a Nigerian prince"}
    ];

    headElements = ['Date', 'Name', 'Email', 'Message'];

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}