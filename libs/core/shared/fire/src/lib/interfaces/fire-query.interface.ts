export interface CoreFireQuery {
  where?: any;
  orderBy?: [any, any];
  limit?: number;
  startAt?: string;
  startAfter?: string;
  endAt?: string;
  endBefore?: string;
  exec(ref: firebase.firestore.CollectionReference): any;
}
