import { Injectable } from '@angular/core';
import { Issue } from './issue';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issuesCollection: AngularFirestoreCollection<Issue>;

  constructor(private firestore: AngularFirestore) {
    this.issuesCollection = this.firestore.collection<Issue>('issues');
  }

  getIssues(): Observable<Issue[]> {
    return this.firestore
      .collection<Issue>('issues')
      .valueChanges({ idField: 'id' })
      .pipe(
        map((issues) =>
          issues.map((issue) => ({
            ...issue,
            completed: issue.completed
              ? (issue.completed as any).toDate()
              : null,
          }))
        ),
        catchError(this.handleError<Issue[]>('getIssues', []))
      );
  }

  getIssue(id: string): Observable<Issue | undefined> {
    return this.issuesCollection
      .doc(id)
      .valueChanges()
      .pipe(catchError(this.handleError<Issue>('getIssue')));
  }

  addIssue(issue: Issue): Promise<void> {
    return this.issuesCollection
      .add(issue)
      .then(() => {})
      .catch((error) => {
        this.handleError<any>('addIssue')(error);
        return Promise.reject(error);
      });
  }

  updateIssue(id: string, issue: Partial<Issue>): Promise<void> {
    return this.issuesCollection
      .doc(id)
      .update(issue)
      .then(() => {})
      .catch((error) => {
        this.handleError<any>('updateIssue')(error);
        return Promise.reject(error);
      });
  }

  deleteIssue(id: string): Promise<void> {
    return this.issuesCollection
      .doc(id)
      .delete()
      .then(() => {})
      .catch((error) => {
        this.handleError<any>('deleteIssue')(error);
        return Promise.reject(error);
      });
  }

  getPendingIssues(): Observable<Issue[]> {
    return this.firestore
      .collection<Issue>('issues', (ref) =>
        ref.where('status', '==', 'pending')
      )
      .valueChanges({ idField: 'id' })
      .pipe(catchError(this.handleError<Issue[]>('getPendingIssues', [])));
  }

  getCompletedIssues(): Observable<Issue[]> {
    return this.firestore
      .collection<Issue>('issues', (ref) =>
        ref.where('status', '==', 'completed')
      )
      .valueChanges({ idField: 'id' })
      .pipe(catchError(this.handleError<Issue[]>('getCompletedIssues', [])));
  }

  getIssueByStatus(status: string): Observable<Issue[]> {
    return this.firestore
      .collection<Issue>('issues', (ref) => ref.where('status', '==', status))
      .valueChanges({ idField: 'id' })
      .pipe(catchError(this.handleError<Issue[]>('getIssueByStatus', [])));
  }

  completeIssue(issue: Issue): Promise<void> {
    const resolvedTimestamp = new Date();
    return this.issuesCollection
      .doc(issue.id)
      .update({
        completed: resolvedTimestamp,
      })
      .then(() => {
        console.log('Issue resolved');
      })
      .catch((error) => {
        console.error('Error resolving issue: ', error);
      });
  }

  createIssue(issue: Issue): Promise<void> {
    return this.issuesCollection
      .add(issue)
      .then(() => {})
      .catch((error) => {
        this.handleError<any>('createIssue')(error);
        return Promise.reject(error);
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
