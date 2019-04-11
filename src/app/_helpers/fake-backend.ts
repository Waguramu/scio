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

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const subscriptions: Subscription[] = [
            { id: '1', active: true, expires: '31.12.2019', type: 'Expert' },
            { id: '2', active: true, expires: '31.12.2019', type: 'Expert' },
            { id: '3', active: true, expires: '31.12.2019', type: 'Expert' },
            { id: '4', active: true, expires: '31.12.2019', type: 'Expert' }
        ];
        var users: User[] = [
            { id: "1", username: '', password: '', firstName: '', lastName: '', email: '',
                birthday: '', saved: null, client: null, history: null, photo: '', subscription: subscriptions[0] },
            { id: "2", username: '', password: '', firstName: '', lastName: '', email: '',
                birthday: '', saved: null, client: null, history: null, photo: '', subscription: subscriptions[1] },
            { id: "3", username: '', password: '', firstName: '', lastName: '', email: '',
                birthday: '', saved: null, client: null, history: null, photo: '', subscription: subscriptions[2] },
            { id: "4", username: '', password: '', firstName: '', lastName: '', email: '',
                birthday: '', saved: null, client: null, history: null, photo: '', subscription: subscriptions[3] }
        ];
        const documents: Document[] = [
            { id: "1", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
                file: '' },
            { id: "2", creator: null, title: '', annotations: [''], date:'', keypoints: [''],
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
        const collections: Collection[] = [
            { id: "1", creator: null, title: '', annotations: [''], date: '', documents: [''],
                summary: '' },
            { id: "2", creator: null, title: '', annotations: [''], date: '', documents: [''],
                summary: '' },
            { id: "3", creator: null, title: '', annotations: [''], date: '', documents: [''],
                summary: '' },
            { id: "4", creator: null, title: '', annotations: [''], date: '', documents: [''],
                summary: '' },
            { id: "5", creator: null, title: '', annotations: [''], date: '', documents: [''],
                summary: '' }
        ];
        const histories: History[] = [
            { id: "1", collections: null, documents: null },
            { id: "2", collections: null, documents: null },
            { id: "3", collections: null, documents: null },
            { id: "4", collections: null, documents: null }
        ];
        const saved: Attachments[] = [
            { id: "1", collections: null, documents: null },
            { id: "2", collections: null, documents: null },
            { id: "3", collections: null, documents: null },
            { id: "4", collections: null, documents: null }
        ];
        const attachments: Attachments[] = [
            { id: "1", collections: null, documents: null },
            { id: "2", collections: null, documents: null },
            { id: "3", collections: null, documents: null }
        ];
        const client: Client[] = [
            { id: "1", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: attachments[0] },
            { id: "2", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: attachments[1] },
            { id: "3", firstName: '', lastName: '', address: '', birthday: '', email: '', phone: '', attachments: attachments[2] }
        ];
        users[0].history = histories[0];
        users[1].history = histories[1];
        users[2].history = histories[2];
        users[3].history = histories[3];

        users[0].saved = saved[0];
        users[1].saved = saved[1];
        users[2].saved = saved[2];
        users[3].saved = saved[3];

        users[0].client = client[0];
        users[1].client = client[1];
        users[2].client = client[3];
        users[3].client = client[3];


        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.username === request.body.username && x.password === request.body.password);
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