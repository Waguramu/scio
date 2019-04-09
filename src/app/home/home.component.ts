import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    users: User[] = [];

    constructor(private userService: UserService) { }

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
}