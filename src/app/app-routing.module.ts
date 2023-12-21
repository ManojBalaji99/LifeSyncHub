import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentsComponent } from './pages/moments/moments.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';

const routes: Routes = [{ path: "moments", component: MomentsComponent },
{path:"expense",component:ExpenseComponent},{path:"todolist",component:TodoListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
