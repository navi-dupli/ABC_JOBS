import * as process from 'process';

export default class FirestoreConfig {
  static getFirestoreConfig(): any {
    if (process.env.NODE_ENV === 'production') {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud',
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.PRIVATE_KEY,
        },
      };
    } else {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud-qa',
        keyFilename: 'firestore-crendentials.json',
      };
    }
  }
}
