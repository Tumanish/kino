import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  // TO DO добавить класс 
  filmData = {
    id:-1,
    name:"",
    genre:"",
    year:"",
    description:"",
    genreStr: [""],
    imageUrl:""
  };

  bestFilmFlag = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("!!!!!",data);
    this.filmData = data;


    this.testFilm();

    // this.setBestFilmToLocalStorage(data);
  }

  onNoClick(): void {
    console.log("close");
    this.dialogRef.close(this.data);
  }

  selectBestFilm(){
    this.setBestFilmToLocalStorage(this.data);
    console.log("SELECT", this.data);
    this.dialogRef.close(this.data);
  }

  removeFromBestFilm(){
    console.log("removeFromBestFilm");
    localStorage.clear()
    this.testFilm();
    this.dialogRef.close(this.data);
  }

  setBestFilmToLocalStorage(film: any) {
    localStorage.setItem("bestFilm", JSON.stringify(film))
    // this.getBestFilmFromLocalStorage();
  }

  testFilm(){
    let testFilm = localStorage.getItem("bestFilm");
    if (testFilm){
      if(JSON.parse(testFilm).id == this.filmData.id){
        this.bestFilmFlag = true;
      }
    }
  }
}
