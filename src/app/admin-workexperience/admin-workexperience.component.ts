import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {

  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: String = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService) {
    console.log(this.workExperienceService);
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
      console.log(this.workExperience);
    });
  }

  AgregarJob() {
    if (this.myWorkExperience.id) {
      this.workExperienceService.updateWorkExperience(this.myWorkExperience.id, this.myWorkExperience).then(() => {
        console.log('Updated successfully');
        this.resetForm();
      });
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteJob(id?: string) {
    this.workExperienceService.deleteWorkExperience(id).then(() => {
      console.log('Deleted successfully');
    });
  }

  editJob(item: WorkExperience) {
    this.myWorkExperience = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.btntxt = "Agregar";
  }
}


