import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './modal/modal.component';

import data from '../assets/json/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cinema';
  imageAdres: string[] =[];
  bestFilm: any | null = null;
  data = data;

  constructor(public dialog: MatDialog) {
    for (let i = 0; i < data.length; i++) {
      this.imageAdres.push("../assets/images/" + (i + 1) + ".jpeg")
    }
    this.getBestFilmFromLocalStorage();
  }

  openDialog(id:number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data:this.data[id],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // if(result){
      //   console.log(result);
      // }
      this.getBestFilmFromLocalStorage();
    });
  }

  setBestFilmToLocalStorageById(id: number) {
    localStorage.setItem("bestFilm", JSON.stringify(data[id]))
    this.getBestFilmFromLocalStorage();
    console.log(this.bestFilm);
  }

  getBestFilmFromLocalStorage() {
    let item = localStorage.getItem("bestFilm");
    if (item) {
      this.bestFilm = JSON.parse(item);
      console.log("Сработал парсер Json");
    }
  }


}
