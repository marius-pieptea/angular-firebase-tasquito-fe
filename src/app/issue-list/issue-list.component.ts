import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IssuesService } from '../issues.service';
import { Issue } from '../issue';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  issues$: Observable<Issue[]> = new Observable();
  showReportIssue = false;
  selectedIssue: Issue | null = null;
  editedIssues: { [key: string]: Partial<Issue> } = {};

  constructor(private issueService: IssuesService) {}

  ngOnInit() {
    this.issues$ = this.issueService.getIssues();
  }

  onEdit(issue: Issue) {
    this.editedIssues[issue.id] = { ...issue };
  }

  onSave(issue: Issue) {
    this.issueService
      .updateIssue(issue.id, this.editedIssues[issue.id])
      .then(() => {
        console.log('Issue updated successfully');
        delete this.editedIssues[issue.id];
      })
      .catch((error) => {
        console.error('Error updating issue: ', error);
      });
  }

  onCancel(issue: Issue) {
    delete this.editedIssues[issue.id];
  }

  saveAll() {
    const updatePromises = Object.keys(this.editedIssues).map((id) =>
      this.issueService.updateIssue(id, this.editedIssues[id])
    );

    Promise.all(updatePromises)
      .then(() => {
        console.log('All issues updated successfully');
        this.editedIssues = {};
      })
      .catch((error) => {
        console.error('Error updating issues: ', error);
      });
  }

  onCloseReport() {
    this.showReportIssue = false;
  }

  onResolve(issue: Issue) {
    this.issueService.completeIssue(issue);
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issueService.completeIssue(this.selectedIssue);
    }
    this.selectedIssue = null;
  }
}
