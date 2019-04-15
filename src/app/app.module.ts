import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { SearchComponent } from "@/search/search.component";
import { EmailComponent } from "@/email/email.component";
import { DocumentComponent } from "@/document/document.component";
import { UserComponent } from "@/user/user.component";
import { AccordionModule } from 'ngx-bootstrap';
import { MemoComponent } from "@/memo/memo.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        AccordionModule.forRoot(),
        CKEditorModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SearchComponent,
        EmailComponent,
        DocumentComponent,
        UserComponent,
        MemoComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }