import { Inject, Injectable } from '@nestjs/common';
import JiraApi from 'jira-client';
import { JiraIssue } from '../../graphql';

@Injectable()
export class JiraService {
  constructor(@Inject('JIRA_API') private jiraApi: JiraApi) {}

  async getIssue(id: string): Promise<JiraIssue | null> {
    const response = await this.jiraApi.findIssue(id);

    return response ? (response as JiraIssue) : null;
  }
}
