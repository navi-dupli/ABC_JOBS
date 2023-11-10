import { Injectable, Logger } from '@nestjs/common';
import { Firestore, WhereFilterOp } from '@google-cloud/firestore';

export type Filter = { field: string; condition: WhereFilterOp; value: any };

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private readonly db: Firestore) {}

  async save(collection: string, document: string, data: any) {
    await this.db.collection(collection).doc(document).set(data);
  }

  async saveBatch(collection: string, documents: Map<string, any>) {
    const firestoreBatch = this.db.batch();
    documents.forEach((value, key) => {
      const docRef = this.db.collection(collection).doc(key);
      firestoreBatch.set(docRef, value);
    });
    await firestoreBatch.commit();
  }

  async get(collection: string, document: string) {
    const documentReference = this.db.collection(collection).doc(document);
    const doc = await documentReference.get();
    return doc.data();
  }

  async getFiltered(collection: string, filters: Filter[], limit: number) {
    const collectionReference = this.db.collection(collection);
    if (filters.length > 0) {
      filters.forEach((filterDef) => {
        collectionReference.where(filterDef.field, filterDef.condition, filterDef.value);
      });
    }
    if (limit > 0) {
      collectionReference.limit(limit);
    }
    return await collectionReference.get();
  }

  update(collection: string, document: string, instanceDocument: any) {
    this.db.collection(collection).doc(document).update(instanceDocument);
  }
}
