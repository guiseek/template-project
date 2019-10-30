import { CoreFireQuery } from '../interfaces/fire-query.interface';

export class FireQuery implements CoreFireQuery {
  where?: Array<[string | firebase.firestore.FieldPath, firebase.firestore.WhereFilterOp, any]>;
  orderBy?: [string | firebase.firestore.FieldPath, firebase.firestore.OrderByDirection];
  limit?: number;
  startAt?: string;
  startAfter?: string;
  endAt?: string;
  endBefore?: string;

  exec(ref: firebase.firestore.CollectionReference) {
    let query: any = ref;

    if (this.where) {
      for (const w of this.where) {
        query = query.where(w[0], w[1], w[2]);
      }
    }

    if (this.orderBy)
      query = query.orderBy(this.orderBy[0], this.orderBy[1]);

    if (this.limit)
      query = query.limit(this.limit);

    if (this.startAt)
      query = query.startAt(this.startAt);

    if (this.startAfter)
      query = query.startAfter(this.startAfter);

    if (this.endAt)
      query = query.endAt(this.endAt);

    if (this.endBefore)
      query = query.endBefore(this.endBefore);

    return query;
  }
}
