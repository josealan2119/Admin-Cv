import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  skills : Skills [] = [];
  mySkill : Skills = new Skills();

  constructor(public skillsService : SkillsService)
  {
    console.log(this.skillsService);
    this.skillsService.getSkill().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.skills = data;
      console.log(this.skills);
     })
  } 

  AgregarSkill(){
    console.log(this.mySkill)
    this.skillsService.createSkill(this.mySkill).then(() => {
      console.log('created new item succesfully');
    });
  }

  deleteSkill(id? : string){
   this.skillsService.deleteSkill(id).then(() => {
    console.log('delete item succesfully');
   });
  }
}
