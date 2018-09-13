import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as papa from 'papaparse';
import { Item } from '../../../node_modules/ionic-angular/umd';

@Injectable()
export class ScanServiceProvider {

  private scannedStock = [];
  csv: string = "";  
  csvJsonData: any[] = [];
  headerRow: any[] = [];
  

  private stockItems: {barcode: string, quantity: number, date: string}[] = [];
 // private stock: {barcode: string}[] = [];

  constructor(public http: HttpClient) {
  }


  saveScan(stock: {barcode: string, quantity: number, date: string}){
    this.stockItems.push(stock);
    return this.getAllScannedStock();
  }

  getAllScannedStock(){
    return [...this.stockItems]; //returns a copy of the array
   // return this.stock.slice();
  }


  //CSV saving:--------------------------------------------------
  saveScanCsv(scannedItem: {barcode: string, quantity: number, date: string}){ 
    
    if (scannedItem.quantity.toString() == "")
    {
      scannedItem.quantity = 1;
    }
    this.scannedStock.push(scannedItem);

    this.csv = papa.unparse({
      fields: ["barcode", "quantity", "date"],
      data: this.scannedStock
    });

    console.log("Parsed csv data: ", this.csv);
  }

  getJsonOfCSV(){
      return this.extractData(this.csv);
     // return papa.parse(this.csv);
  }


  //returnCSVData
   
  private extractData(res) {
   // let csvData = res['_body'] || '';
    let parsedData = papa.parse(res).data;
 
    this.headerRow = parsedData[0];
 
    parsedData.splice(0, 1);
    return this.csvJsonData = parsedData;
  }
  //EndOf CSV saving
} 
