import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '@/_models';
import { Client } from '@/_models';
import { Collection } from '@/_models';
import { Document } from '@/_models';
import { Attachments } from '@/_models';
import { History } from '@/_models';
import { Subscription } from '@/_models';

export class FakeData {

    subscriptions: Subscription[] = [
        { id: '1', active: true, expires: '31.12.2019', type: 'Expert' },
        { id: '2', active: true, expires: '31.12.2018', type: 'Expert' },
        { id: '3', active: true, expires: '31.12.2017', type: 'Expert' },
        { id: '4', active: true, expires: '31.12.2016', type: 'Expert' }
    ];
    users: User[] = [
        { id: "1", username: 'jessica.pearson', password: 'p3@rs0n', firstName: 'Jessica', lastName: 'Pearson', email: 'jessica.pearson@awesomecompany.de', tel:'089 111111',
            birthday: '01.06.1990', saved: null, clients: null, history: null, photo: '', subscription: this.subscriptions[0] },
        { id: "2", username: 'harvey.specter', password: 'sp3ct3r', firstName: 'Harvey', lastName: 'Specter', email: 'harvey.specter@awesomecompany.de', tel:'089 222222',
            birthday: '01.01.1990', saved: null, clients: null, history: null, photo: '', subscription: this.subscriptions[1] },
        { id: "3", username: 'rachel.zane', password: 'z@n3', firstName: 'Rachel', lastName: 'Zane', email: 'rachel.zane@awesomecompany.de', tel:'089 333333',
            birthday: '01.12.1990', saved: null, clients: null, history: null, photo: '', subscription: this.subscriptions[2] },
        { id: "4", username: 'mike.ross', password: 'r0ss', firstName: 'Mike', lastName: 'Ross', email: 'mike.ross@awesomecompany.de', tel:'089 444444',
            birthday: '01.03.1990', saved: null, clients: null, history: null, photo: '', subscription: this.subscriptions[3] }
    ];
    documents: Document[] = [
        { id: "1", creator: null, title: 'Neue Probleme beim Autokauf', annotations: [''], date:'01.01.2019', keypoints: [''],
            file: 'Konrad Klein (K) kaufte im März 2017 bei Bernhard Vogel (V), einem gewerblichen Autohändler einen von ihm zuvor besichtigten gebrauchten Pkw, der ihm am 26. März 2017 übergebenwurde. Das Fahrzeug dient der Familie Klein für private Fahrten. Am 23. Juni 2017 leuchtet während einer Fahrt auf der Autobahn in Höhe Augsburg die Motor-Management-Kontrollleuchte auf. In der nächstgelegenen KfZ-Werkstatt wurde ein Defekt des Katalysators festgestellt. Seit wann dieser Defekt am Katalysator besteht, lässt sich nicht mehr klären. Eine Weiterfahrt war möglich. Dennoch lässt K den Wagen sofort reparieren. Für diese Reparaturrechnung stellt die KfZ-Werkstatt 1.400 € in Rechnung. K verlangt von V den Ersatz dieser Rechnung. V weigert sich: Der Defekt am Katalysator sei auf die Fahrweise des K zurückzuführen. Im Übrigen hätte K erst zu ihm kommen müssen statt eigenmächtig zu handeln.' },
        { id: "2", creator: null, title: 'Geschädigte Helfer', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "3", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "4", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "5", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "6", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "7", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "8", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "9", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "10", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "11", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' },
        { id: "12", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
            file: '' }
    ];
    collections: Collection[] = [
        { id: "1", creator: null, title: '', annotations: [''], date: '', documents: [this.documents[1]],
            summary: '' },
        { id: "2", creator: null, title: '', annotations: [''], date: '', documents: [this.documents[0]],
            summary: '' },
        { id: "3", creator: null, title: '', annotations: [''], date: '', documents: [this.documents[0]],
            summary: '' },
        { id: "4", creator: null, title: '', annotations: [''], date: '', documents: [this.documents[0]],
            summary: '' },
        { id: "5", creator: null, title: '', annotations: [''], date: '', documents: [this.documents[0]],
            summary: '' }
    ];
    histories: History[] = [
        { id: "1", collections: null, documents: null },
        { id: "2", collections: null, documents: null },
        { id: "3", collections: null, documents: null },
        { id: "4", collections: null, documents: null }
    ];
    saved: Attachments[] = [
        { id: "1", collections: null, documents: null },
        { id: "2", collections: null, documents: null },
        { id: "3", collections: null, documents: null },
        { id: "4", collections: null, documents: null }
    ];
    attachments: Attachments[] = [
        { id: "1", collections: null, documents: null },
        { id: "2", collections: null, documents: null },
        { id: "3", collections: null, documents: null }
    ];
    clients: Client[] = [
        { id: "1", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: this.attachments[0] },
        { id: "2", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: this.attachments[1] },
        { id: "3", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: this.attachments[2] }
    ];

    constructor(){
        this.users[0].history = this.histories[0];
        this.users[1].history = this.histories[1];
        this.users[2].history = this.histories[2];
        this.users[3].history = this.histories[3];

        this.users[0].saved = this.saved[0];
        this.users[1].saved = this.saved[1];
        this.users[2].saved = this.saved[2];
        this.users[3].saved = this.saved[3];
/*
        this.users[0].clients = this.[this.clients[0]];
        this.users[1].clients = this.[this.clients[1]];
        this.users[2].clients = this.[this.clients[3]];
        this. users[3].clients = this.[this.clients[3]];
        */
    };

     getUsers(): User[] {
        return this.users;
    };
}

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let fake = new FakeData();
        let users = fake.getUsers();


        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {

                let user = users.find(x => x.username === request.body.username && x.password === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
            }

            // get all users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                return ok(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());

        // private helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};