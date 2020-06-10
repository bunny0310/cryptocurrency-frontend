import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';
import { TransactionPoolMapComponent } from './transaction-pool-map/transaction-pool-map.component';


const routes: Routes = [
  {path: '', component: BlocksComponent},
  {path: 'block/:id', component: BlockComponent},
  {path: 'transaction-pool-map', component: TransactionPoolMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
