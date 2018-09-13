import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const STORAGE_KEY = 'scannedItem';

@Injectable()
export class SaveProgressProvider {

  constructor(public storage: Storage) {
   // console.log('Hello SaveProgressProvider Provider');
  }


  isFavorite(filmId) {
    return this.getAllKeys().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }
 
  saveScan(scannedItem) {
   // debugger;
    return this.getAllKeys().then(result => {
      if (result) {
        result.push(scannedItem);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [scannedItem]);
      }
    });
  }

  getAllKeys() {   
   // return this.storage.get(STORAGE_KEY);
    return this.storage.keys()
      .then(keys => Promise.all(keys.map(k => this.storage.get(k))));
  }

}
