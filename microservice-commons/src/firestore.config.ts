export default class FirestoreConfig {
  static getFirestoreConfig(): any {
    if (process.env.NODE_ENV === 'production') {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud',
      };
    } else {
      return {
        projectId: process.env.GCP_PROJET_ID || 'proyecto-final-xcloud-qa',
        keyFilename: 'firestore-crendentials.json',
      };
    }
  }
}