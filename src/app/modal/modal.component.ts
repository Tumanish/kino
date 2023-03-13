import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  // TO DO добавить класс 
  filmData:any 

  bestFilmFlag = false;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.filmData = data;
    this.testFilm();
  }

  onNoClick(): void {
    console.log("close");
    this.dialogRef.close(this.data);
  }

  selectBestFilm(){
    localStorage.setItem("bestFilm", JSON.stringify(this.filmData))
    console.log("Выбран: ", this.filmData);
    this.dialogRef.close(this.data);
  }

  removeFromBestFilm(){
    console.log("removeFromBestFilm");
    localStorage.clear()
    this.dialogRef.close(this.data);
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
