import { Injectable, Logger } from '@nestjs/common';
import { Firestore, WhereFilterOp } from '@google-cloud/firestore';

@Injectable()
export class FirebaseServiceService {
  private readonly logger = new Logger(FirebaseServiceService.name);
  private readonly db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud-qa',
      keyFilename: 'firestore-crendentials.json',
    });
  }

  async save(collection: string, document: string, data: any) {
    await this.db.collection(collection).doc(document).set(data);
  }

  async get(collection: string, document: string) {
    const documentReference = this.db.collection(collection).doc(document);
    const doc = await documentReference.get();
    if (!doc.exists) {
      this.logger.error(`Document ${document} not found! in collection ${collection}`);
    }
    return doc.data();
  }

  async getFiltered(
    collection: string,
    filters: { field: string; condition: WhereFilterOp; value: any }[],
    limit: number,
  ) {
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
