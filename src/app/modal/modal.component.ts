import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  filmData = {
    name:"",
    genre:"",
    year:"",
    description:""
  };

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.filmData = data;
    console.log(dialogRef);
    // this.setBestFilmToLocalStorage(data);
  }

  onNoClick(): void {
    console.log("close");
    this.dialogRef.close(this.data);
  }

  selectBestFilm(){
    this.setBestFilmToLocalStorage(this.data);
    console.log("SELECT", this.data);
  }

  setBestFilmToLocalStorage(film: any) {
    localStorage.setItem("bestFilm", JSON.stringify(film))
    // this.getBestFilmFromLocalStorage();
  }
}
