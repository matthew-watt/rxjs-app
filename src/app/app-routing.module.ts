import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwitchMapComponent } from './components/switch-map/switch-map.component';

const routes: Routes = [
  { path: 'switch-map', component: SwitchMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
