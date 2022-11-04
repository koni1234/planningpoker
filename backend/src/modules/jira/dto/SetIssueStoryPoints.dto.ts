import { IsInt, IsString } from 'class-validator';
import { SetJiraIssueStoryPointsInput } from '../../../graphql';

export class SetIssueStoryPointsDto implements SetJiraIssueStoryPointsInput {
  @IsString()
  readonly issueId: string;

  @IsInt()
  readonly storyPoints: number;
}
