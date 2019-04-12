import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { SearchComponent } from "@/search/search.component";
import { DocumentComponent } from "@/document/document.component";


const appRoutes: Routes = [
    {
        path: '',
        component: SearchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'document',
        component: DocumentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);