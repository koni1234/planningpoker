import { Args, Query, Resolver } from '@nestjs/graphql';
import { JiraService } from './Jira.service';
import { JiraIssue } from '../../graphql';

@Resolver('Jira')
export class JiraResolver {
  constructor(private readonly jiraService: JiraService) {}

  @Query('getIssue')
  async getIssue(@Args('id') id: string): Promise<JiraIssue | null> {
    return await this.jiraService.getIssue(id);
  }
}
