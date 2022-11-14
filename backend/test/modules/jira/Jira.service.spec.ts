import { Test, TestingModule } from '@nestjs/testing';
import { JiraService } from '../../../src/modules/jira/Jira.service';
import { JiraResolver } from '../../../src/modules/jira/Jira.resolver';
import { SetIssueStoryPointsDto } from '../../../src/modules/jira/dto/SetIssueStoryPoints.dto';

describe('JiraService', () => {
  let service: JiraService;

  const mockedJiraApi = {
    findIssue: jest.fn(),
    updateIssue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JiraService,
        JiraResolver,
        {
          provide: 'JIRA_API',
          useValue: mockedJiraApi,
        },
      ],
    }).compile();

    service = module.get<JiraService>(JiraService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a jira issue properly', async () => {
    const jiraIssueEntity = { id: 'issue-id' };

    jest.spyOn(mockedJiraApi, 'findIssue').mockReturnValueOnce(jiraIssueEntity);

    const result = await service.getIssue('issue-id');

    expect(mockedJiraApi.findIssue).toHaveBeenCalledWith('issue-id');
    expect(result).toStrictEqual(jiraIssueEntity);
  });

  it('Should set story points of an issue properly', async () => {
    jest.spyOn(mockedJiraApi, 'updateIssue').mockReturnValueOnce(true);

    const dto: SetIssueStoryPointsDto = { issueId: 'id', storyPoints: 5 };
    const result = await service.setIssueStoryPoints(dto);

    expect(mockedJiraApi.updateIssue).toHaveBeenCalledWith(dto.issueId, {
      fields: {
        customfield_10021: dto.storyPoints,
      },
    });
    expect(result).toStrictEqual('id');
  });
});
