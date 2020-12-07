import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FusionAuthSignUpResponse {
  @Field()
  success: boolean;
}
