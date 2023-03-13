import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

import { ModalComponent } from './modal/modal.component';

import dataJSON from '../assets/json/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cinema';
  bestFilm: any | null = null;
  data: any[] = dataJSON; //  from json
  displayData: any[] = [];
  value = '';

  toppings: FormControl;
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
    this.toppings = new FormControl('');
    this.getBestFilmFromLocalStorage();
    this.displayDataFromJson();
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

  filterByGenreStr(genryStringArray: string[] | string) {
    this.displayDataFromJson();
    let result: any[] = [];
    if (Array.isArray(genryStringArray)) {
      this.displayData.forEach((v, i, arr) => {
        let test = 0;
        for (let i = 0; i < v.genreStr.length; i++) {
          for (let j = 0; j < genryStringArray.length; j++) {
            if (v.genreStr[i] == genryStringArray[j]) { test++ };
          }
        }
        if (test == genryStringArray.length) {
          result.push(v)
        }
      })
      console.log(genryStringArray.length,result,genryStringArray);
      this.displayData = result;
    } else {
      this.displayDataFromJson();
    }
  }

  displayDataFromJson() { // reset view
    this.displayData = [];
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
  }

  openDialog(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(ModalComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //
      }
      this.getBestFilmFromLocalStorage();
    });
  }

  getBestFilmFromLocalStorage() {
    let item = localStorage.getItem("bestFilm");
    if (item) {
      this.bestFilm = JSON.parse(item);
    } else {
      this.bestFilm = null;
    }
  }

  test() {
    if (this.toppings.value?.length) {
      this.filterByGenreStr(this.toppings.value)
    } else {
      this.displayDataFromJson()
    }
    // this.toppings.valueChanges.subscribe((value) => { 
    //   console.log(value);
    //  })
  }

  findFilm(x: any) {
    this.test();
    let result: any = [];
    if (this.displayData) {
      for (let i = 0; i < this.displayData.length; i++) {
        let test = this.displayData[i].name.toLowerCase().indexOf(x.toLowerCase());
        if (test + 1) {
          result.push(this.displayData[i]);
        }
      }
      this.displayData = result;
    }
  }
}
