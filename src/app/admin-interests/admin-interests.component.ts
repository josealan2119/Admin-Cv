import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {

  myInterests : Interests = new (Interests);
  interests : Interests [] = []
  btntxt : string = "Guardar";

  constructor(public interestsService : InterestsService)
  {
    console.log(this.interestsService);
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.interests = data;
      console.log(this.interests);
    })
  }

  AgregarInterest() {
    if (this.myInterests.id) {
      this.interestsService.updateInterests(this.myInterests.id, this.myInterests).then(() => {
        console.log('Updated successfully');
        this.resetForm();
      });
    } else {
      this.interestsService.createInterests(this.myInterests).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteInterest(id?: string) {
    this.interestsService.deleteInterests(id).then(() => {
      console.log('Deleted successfully');
    });
  }

  editInterest(item: Interests) {
    this.myInterests = { ...item };
    this.btntxt = "Actualizar";
  }

  resetForm() {
    this.myInterests = new Interests();
    this.btntxt = "Guardar";
  }
}
