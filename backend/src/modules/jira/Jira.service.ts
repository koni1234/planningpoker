import { Inject, Injectable } from '@nestjs/common';
import JiraApi from 'jira-client';
import { JiraIssue } from '../../graphql';
import { SetIssueStoryPointsDto } from './dto/SetIssueStoryPoints.dto';

@Injectable()
export class JiraService {
  constructor(@Inject('JIRA_API') private jiraApi: JiraApi) {}

  async getIssue(id: string): Promise<JiraIssue | null> {
    const response = await this.jiraApi.findIssue(id, 'renderedFields');

    return response ? (response as JiraIssue) : null;
  }

  async setIssueStoryPoints(dto: SetIssueStoryPointsDto): Promise<string> {
    await this.jiraApi.updateIssue(dto.issueId, {
      fields: {
        customfield_10021: dto.storyPoints,
      },
    });

    return dto.issueId;
  }
}
