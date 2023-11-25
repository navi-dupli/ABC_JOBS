import * as process from 'process';

export default class FirestoreConfig {
  static getFirestoreConfig(): any {
    if (process.env.NODE_ENV === 'production') {
      return JSON.parse(process.env.FIRESTORE_CREDENTIALS || '{}');
    } else {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud-qa',
        keyFilename: 'firestore-crendentials.json',
      };
    }
  }
}
