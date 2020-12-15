import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => Boolean)
  async status() {
    return true;
  }
}
