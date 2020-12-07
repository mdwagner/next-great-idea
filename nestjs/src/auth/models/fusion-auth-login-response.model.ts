import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FusionAuthLoginResponse {
  @Field()
  token: string;

  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;
}
