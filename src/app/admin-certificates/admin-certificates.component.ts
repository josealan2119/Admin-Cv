import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {


  itemCount: number = 0;
  btntxt: string = "Agregar"
  goalText: string="";
  certificates: certificates [] = [];
  myCertificates : certificates = new certificates();
   
   constructor(public certificatesService : CertificatesService)
   {
    console.log(this.certificatesService);
    this.certificatesService.getCertificate().snapshotChanges().pipe(
      map(changes => 
        changes.map(c =>
        ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
     ).subscribe(data => {
      this.certificates = data;
      console.log(this.certificates);
     })
   }
   
   AgregarCertificates() {
    if (this.myCertificates.id) {
      // Si tiene ID, es actualización
      this.certificatesService.updateCertificate(this.myCertificates.id, this.myCertificates).then(() => {
        console.log('Updated successfully');
        this.resetForm();
      });
    } else {
      // Si no tiene ID, es nuevo
      this.certificatesService.createCertificate(this.myCertificates).then(() => {
        console.log('Created successfully');
        this.resetForm();
      });
    }
  }

  deleteCertificate(id?: string) {
    this.certificatesService.deleteCertificate(id).then(() => {
      console.log('Deleted successfully');
    });
  }

  editCertificate(cert: certificates) {
    this.myCertificates = { ...cert }; // Carga datos al formulario
    this.btntxt = 'Actualizar';
  }

  resetForm() {
    this.myCertificates = new certificates();
    this.btntxt = 'Agregar';
  }
}
