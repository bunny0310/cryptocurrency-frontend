import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WalletInfoComponent } from './wallet-info/wallet-info.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule, MatFormFieldModule, MatButtonModule, MatTableDataSource, MatTableModule, 
  MatBadgeModule, MatExpansionModule, MatChipsModule, MatPaginatorModule, MatProgressBarModule,
   MatSidenavModule, MatCheckboxModule, MatListModule, MatToolbarModule} from '@angular/material/';
import { FormsModule } from '@angular/forms';
import { TransactionPoolMapComponent } from './transaction-pool-map/transaction-pool-map.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockComponent } from './block/block.component';


@NgModule({
  declarations: [
    AppComponent,
    WalletInfoComponent,
    TransactionPoolMapComponent,
    BlocksComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatBadgeModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
