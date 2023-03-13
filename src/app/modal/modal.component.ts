import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
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
    this.dialogRef.close();
  }

  selectBestFilm(){
    localStorage.setItem("bestFilm", JSON.stringify(this.filmData))
    this.dialogRef.close(this.data);
  }

  removeFromBestFilm(){
    localStorage.clear()
    this.dialogRef.close();
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
