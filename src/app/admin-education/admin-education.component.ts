import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
  itemCount: number = 0;
  btntxt : string ="Agregar";
  goalText: string ="";
  education: Education[] = []
  myEducation : Education = new Education();

  constructor(public educationService : EducationService)
  {
    console.log(this.educationService);
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.education = data;
      console.log(this.education);
    })
   }

   AgregarEducation() {
    if (this.myEducation.id) {
      this.educationService.updateEducation(this.myEducation.id, this.myEducation).then(() => {
        console.log('Updated successfully');
        this.resetForm();
      });
    } else {
      this.educationService.createEducation(this.myEducation).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
   }

   deleteEducation(id?: string) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('Deleted successfully');
    });
   }

  editEducation(item: Education) {
    this.myEducation = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myEducation = new Education();
    this.btntxt = "Agregar";
  }

}
