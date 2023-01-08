import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  },
  {
    path: "",
    component: PanelComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: "home",
        loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule),
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
