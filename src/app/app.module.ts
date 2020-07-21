import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { PendingComponent } from './components/pending/pending.component';
import { CompletedComponent } from './components/completed/completed.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'tasks', component: TaskComponent},
  {path: 'tasks/create', component: FormComponent},
  {path: 'tasks/create/:id', component: FormComponent},
  {path: 'tasks/pending', component: PendingComponent},
  {path: 'tasks/completed', component: CompletedComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FormComponent,
    PendingComponent,
    CompletedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
