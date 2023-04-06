import { provideApolloClient } from '@vue/apollo-composable';
import { DocumentNode } from 'graphql/language';
import { createMockClient as _createMockClient, RequestHandler } from 'mock-apollo-client';

export type MockClientRequest = [DocumentNode, RequestHandler];

export const createMockClient = (mockRequests: MockClientRequest[] = []) => {
    const mockClient = _createMockClient();

    mockRequests.forEach((mockRequest: MockClientRequest) => {
        mockClient.setRequestHandler(...mockRequest);
    });

    provideApolloClient(mockClient);

    return mockClient;
};
