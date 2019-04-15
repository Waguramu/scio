import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { SearchComponent } from "@/search/search.component";
import { EmailComponent } from "@/email/email.component";
import { DocumentComponent } from "@/document/document.component";
import { UserComponent } from "@/user/user.component";
import { MemoComponent } from "@/memo/memo.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'search', component: SearchComponent },
            { path: 'email', component: EmailComponent },
            { path: 'document', component: DocumentComponent },
            { path: 'user', component: UserComponent },
            { path: 'memo', component: MemoComponent }
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);