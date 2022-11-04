import { Module } from '@nestjs/common';
import { JiraService } from './Jira.service';
import { JiraResolver } from './Jira.resolver';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JiraApi = require('jira-client');

@Module({
  providers: [
    {
      provide: 'JIRA_API',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new JiraApi({
          protocol: configService.get('JIRA_CLIENT_PROTOCOL'),
          host: configService.get('JIRA_CLIENT_HOST'),
          username: configService.get('JIRA_CLIENT_USERNAME'),
          password: configService.get('JIRA_CLIENT_TOKEN'),
          apiVersion: '2',
          strictSSL: true,
        });
      },
    },
    JiraResolver,
    JiraService,
  ],
  exports: ['JIRA_API'],
})
export class JiraModule {}
