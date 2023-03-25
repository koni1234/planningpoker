import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JiraService } from './Jira.service';
import { JiraIssue } from 'Graphql';
import { SetIssueStoryPointsDto } from './dto/SetIssueStoryPoints.dto';

@Resolver('Jira')
export class JiraResolver {
  constructor(private readonly jiraService: JiraService) {}

  @Query('getIssue')
  async getIssue(@Args('id') id: string): Promise<JiraIssue | null> {
    return await this.jiraService.getIssue(id);
  }

  @Mutation('setIssueStoryPoints')
  async setIssueStoryPoints(
    @Args('setIssueStoryPointsInput') dto: SetIssueStoryPointsDto,
  ): Promise<string> {
    return await this.jiraService.setIssueStoryPoints(dto);
  }
}
