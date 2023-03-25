import { IsString } from 'class-validator';
import { SetGameIssueInput } from 'Graphql';

export class SetGameIssueDto implements SetGameIssueInput {
  @IsString()
  readonly gameId: string;

  @IsString()
  readonly userId: string;

  @IsString()
  readonly issueId: string;
}
