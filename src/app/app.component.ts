import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';


import { ModalComponent } from './modal/modal.component';

import data from '../assets/json/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cinema';

  imageAdres: string[] = [];

  bestFilm: any | null = null;

  data: any[] = data; //  from json

  displayData: any[] = [];

  value = '';

  toppings = new FormControl('');
  toppingList: string[] = [
    "драма",
    "биография",
    "история",
    "фэнтези",
    "приключения",
    "боевик",
    "мультфильм",
    "комедия",
    "триллер",
    "детектив",
    "фантастика",
  ];


  constructor(public dialog: MatDialog,
  ) {
    for (let i = 0; i < data.length; i++) {
      this.imageAdres.push(this.imageAdresStringByID(i + 1))
    }
    this.getBestFilmFromLocalStorage();
    this.displayDataFromJson();


    // this.genreStrByNumber([1,2,3])
  }

  imageAdresStringByID(id: number): string {
    let result = "../assets/images/" + (id) + ".jpeg"
    return result;
  }

  genreStrByNumber(numArr: number[]): string[] {
    let template = ["нет", "драма", "биография", "история", "фэнтези", "приключения", "боевик", "мультфильм", "комедия", "триллер", "детектив", "фантастика",];
    let result: string[] = [];
    for (let i = 0; i < numArr.length; i++) {
      result.push(template[numArr[i]])
    }
    // console.log(result);
    return result;
  }

  filterByGenreStr(genryStringArray: string[]) {  }


  displayDataFromJson() {
    for (let i = 0; i < this.data.length; i++) {
      this.displayData.push({
        id: this.data[i].id,
        name: this.data[i].name,
        year: this.data[i].year,
        description: this.data[i].description,
        genre: this.data[i].genre,
        genreStr: this.genreStrByNumber(this.data[i].genre),
        imageUrl: this.imageAdresStringByID(this.data[i].id)
      })
    }

    // console.log(this.displayData);
  }


  openDialog(item: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if (result) {
        // console.log("!!!", result);
      }
      this.getBestFilmFromLocalStorage();
    });
  }

  setBestFilmToLocalStorageById(id: number) {
    localStorage.setItem("bestFilm", JSON.stringify(data[id]))
    this.getBestFilmFromLocalStorage();
    // console.log(this.bestFilm);
  }

  getBestFilmFromLocalStorage() {
    let item = localStorage.getItem("bestFilm");
    if (item) {
      this.bestFilm = JSON.parse(item);
      // console.log("Сработал парсер Json");
    }
  }

  test() {
    console.log(this.toppings.value);
  }

}
