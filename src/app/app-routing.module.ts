import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueReportComponent } from './issue-report/issue-report.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { NoAuthGuard } from './guards/noAuthGuard/no-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'issues', component: IssueListComponent },
      { path: 'issues/new', component: IssueReportComponent },
      { path: 'issues/:id', component: IssueReportComponent },
      { path: '', redirectTo: 'issues', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
