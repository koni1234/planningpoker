import { ArgsType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CreateUserInput } from 'Graphql';

@ArgsType()
export class CreateUserDto implements CreateUserInput {
  @Field()
  @MinLength(1)
  readonly name: string;
}
