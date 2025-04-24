import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  
   private dbPath = '/Certificates';

   certificateRef : AngularFirestoreCollection<certificates>;

  constructor(private db : AngularFirestore) {
    this.certificateRef =  db.collection(this.dbPath);
   }

   getCertificate(): AngularFirestoreCollection<certificates>{
    return this.certificateRef;
   }

   createCertificate(myCertificate : certificates) : any {
    return this.certificateRef.add({...myCertificate});
   }

   deleteCertificate(id? : string) : Promise<void> {
      return this.certificateRef.doc(id).delete();
   }
}
