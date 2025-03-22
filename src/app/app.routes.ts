import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', redirectTo: '/login' },
];

