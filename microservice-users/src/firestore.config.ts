export default class FirestoreConfig {
  static getFirestoreConfig(): any {
    if (process.env.NODE_ENV === 'production') {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud',
        credentials: (process.env.FIRESTORE_CREDENTIALS || '').replace(/\\n/g, '\n'),
      };
    } else {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud-qa',
        keyFilename: 'firestore-crendentials.json',
      };
    }
  }
}
