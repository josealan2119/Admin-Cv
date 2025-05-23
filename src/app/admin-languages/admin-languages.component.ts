import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  languages : Language [] = [];
  myLanguage : Language = new Language();
  btntxt : string = "Guardar";

   constructor(public languagesService : LanguagesService)
   {
     console.log(this.languagesService);
     this.languagesService.getLanguage().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.languages = data;
      console.log(this.languages);
     })
   }

   AgregarLanguage() {
    if (this.myLanguage.id) {
      this.languagesService.updateLanguage(this.myLanguage.id, this.myLanguage).then(() => {
        console.log('Updated successfully');
        this.resetForm();
      });
    } else {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteLanguage(id?: string) {
    this.languagesService.deleteLanguage(id).then(() => {
      console.log('Deleted successfully');
    });
  }

  editLanguage(item: Language) {
    this.myLanguage = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myLanguage = new Language();
    this.btntxt = "Guardar";
  }
}
