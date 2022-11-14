import { Test, TestingModule } from '@nestjs/testing';
import { JiraResolver } from '../../../src/modules/jira/Jira.resolver';
import { JiraService } from '../../../src/modules/jira/Jira.service';
import { SetIssueStoryPointsDto } from '../../../src/modules/jira/dto/SetIssueStoryPoints.dto';

describe('JiraResolver', () => {
  let resolver: JiraResolver;

  const mockedJiraService = {
    getIssue: jest.fn(),
    setIssueStoryPoints: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JiraResolver,
        { provide: JiraService, useValue: mockedJiraService },
      ],
    }).compile();

    resolver = module.get<JiraResolver>(JiraResolver);
  });

  it('Should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should return a jira issue properly', async () => {
    const jiraIssueEntity = { id: 'issue-id' };

    jest
      .spyOn(mockedJiraService, 'getIssue')
      .mockReturnValueOnce(jiraIssueEntity);

    const result = await resolver.getIssue('issue-id');

    expect(mockedJiraService.getIssue).toHaveBeenCalledWith('issue-id');
    expect(result).toStrictEqual(jiraIssueEntity);
  });

  it('Should set story points of an issue properly', async () => {
    const dto: SetIssueStoryPointsDto = { issueId: 'id', storyPoints: 3 };

    jest
      .spyOn(mockedJiraService, 'setIssueStoryPoints')
      .mockReturnValueOnce('id');

    const result = await resolver.setIssueStoryPoints(dto);

    expect(mockedJiraService.setIssueStoryPoints).toHaveBeenCalledWith(dto);
    expect(result).toBe('id');
  });
});
