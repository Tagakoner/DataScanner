import { PreviousScansPage } from './../previous-scans/previous-scans';
import { ScanServiceProvider } from './../../providers/scan-service/scan-service';
import { AddStockPage } from './../add-stock/add-stock';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContinueScansPage } from '../continue-scans/continue-scans';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stockItems: {barcode: string, quantity: number}[] = [];
  scannedStockItems: {barcode: string, amount: string, date: string}[] = [];

  constructor(public navCtrl: NavController,
    private scanServiceProvider: ScanServiceProvider) {

  }

  ionViewWillEnter(){
    this.stockItems = this.getAllStock();
    //this.scannedStockItems = this.getCSVStock();
    console.log("Json converted object: ",this.scannedStockItems);
  
  }

  scanStock(){
    this.navCtrl.push(AddStockPage);
  }

  previousScans(){
    this.navCtrl.push(PreviousScansPage);
  }
  
  continueFromPrevious(){
    this.navCtrl.push(ContinueScansPage);
  }
  getAllStock(){
    return this.scanServiceProvider.getAllScannedStock();
  }


 // getCSVStock(){
 //   return this.scanServiceProvider.getJsonOfCSV();
 // }

}
