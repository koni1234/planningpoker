import { GraphQLErrorExtensions } from 'graphql/error';

export interface BadUserInputExceptionInterface extends GraphQLErrorExtensions {
    code: 'BAD_USER_INPUT';
    response: {
        statusCode: 400;
        error: 'Bad Request';
        message: string[];
    };
}
