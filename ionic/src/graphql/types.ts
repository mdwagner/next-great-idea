export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JsonAny: any;
  bigint: any;
  json: any;
  timestamptz: any;
  uuid: any;
};

export type FusionAuthLoginResponse = {
  __typename?: "FusionAuthLoginResponse";
  email: Scalars["String"];
  id: Scalars["ID"];
  token: Scalars["String"];
  username: Scalars["String"];
};

export type FusionAuthSignUpResponse = {
  __typename?: "FusionAuthSignUpResponse";
  success: Scalars["Boolean"];
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq: Maybe<Scalars["Int"]>;
  _gt: Maybe<Scalars["Int"]>;
  _gte: Maybe<Scalars["Int"]>;
  _in: Maybe<Array<Scalars["Int"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _lt: Maybe<Scalars["Int"]>;
  _lte: Maybe<Scalars["Int"]>;
  _neq: Maybe<Scalars["Int"]>;
  _nin: Maybe<Array<Scalars["Int"]>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq: Maybe<Scalars["String"]>;
  _gt: Maybe<Scalars["String"]>;
  _gte: Maybe<Scalars["String"]>;
  _ilike: Maybe<Scalars["String"]>;
  _in: Maybe<Array<Scalars["String"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _like: Maybe<Scalars["String"]>;
  _lt: Maybe<Scalars["String"]>;
  _lte: Maybe<Scalars["String"]>;
  _neq: Maybe<Scalars["String"]>;
  _nilike: Maybe<Scalars["String"]>;
  _nin: Maybe<Array<Scalars["String"]>>;
  _nlike: Maybe<Scalars["String"]>;
  _nsimilar: Maybe<Scalars["String"]>;
  _similar: Maybe<Scalars["String"]>;
};

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq: Maybe<Scalars["bigint"]>;
  _gt: Maybe<Scalars["bigint"]>;
  _gte: Maybe<Scalars["bigint"]>;
  _in: Maybe<Array<Scalars["bigint"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _lt: Maybe<Scalars["bigint"]>;
  _lte: Maybe<Scalars["bigint"]>;
  _neq: Maybe<Scalars["bigint"]>;
  _nin: Maybe<Array<Scalars["bigint"]>>;
};

/** columns and relationships of "ideas" */
export type Ideas = {
  __typename?: "ideas";
  background_color: Scalars["Int"];
  created_at: Scalars["timestamptz"];
  description: Maybe<Scalars["String"]>;
  id: Scalars["bigint"];
  title: Maybe<Scalars["String"]>;
  updated_at: Scalars["timestamptz"];
  /** An object relationship */
  user: Users;
  user_id: Scalars["bigint"];
};

/** aggregated selection of "ideas" */
export type Ideas_Aggregate = {
  __typename?: "ideas_aggregate";
  aggregate: Maybe<Ideas_Aggregate_Fields>;
  nodes: Array<Ideas>;
};

/** aggregate fields of "ideas" */
export type Ideas_Aggregate_Fields = {
  __typename?: "ideas_aggregate_fields";
  avg: Maybe<Ideas_Avg_Fields>;
  count: Maybe<Scalars["Int"]>;
  max: Maybe<Ideas_Max_Fields>;
  min: Maybe<Ideas_Min_Fields>;
  stddev: Maybe<Ideas_Stddev_Fields>;
  stddev_pop: Maybe<Ideas_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Ideas_Stddev_Samp_Fields>;
  sum: Maybe<Ideas_Sum_Fields>;
  var_pop: Maybe<Ideas_Var_Pop_Fields>;
  var_samp: Maybe<Ideas_Var_Samp_Fields>;
  variance: Maybe<Ideas_Variance_Fields>;
};

/** aggregate fields of "ideas" */
export type Ideas_Aggregate_Fields_CountArgs = {
  columns: Maybe<Array<Ideas_Select_Column>>;
  distinct: Maybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "ideas" */
export type Ideas_Aggregate_Order_By = {
  avg: Maybe<Ideas_Avg_Order_By>;
  count: Maybe<Order_By>;
  max: Maybe<Ideas_Max_Order_By>;
  min: Maybe<Ideas_Min_Order_By>;
  stddev: Maybe<Ideas_Stddev_Order_By>;
  stddev_pop: Maybe<Ideas_Stddev_Pop_Order_By>;
  stddev_samp: Maybe<Ideas_Stddev_Samp_Order_By>;
  sum: Maybe<Ideas_Sum_Order_By>;
  var_pop: Maybe<Ideas_Var_Pop_Order_By>;
  var_samp: Maybe<Ideas_Var_Samp_Order_By>;
  variance: Maybe<Ideas_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ideas" */
export type Ideas_Arr_Rel_Insert_Input = {
  data: Array<Ideas_Insert_Input>;
  on_conflict: Maybe<Ideas_On_Conflict>;
};

/** aggregate avg on columns */
export type Ideas_Avg_Fields = {
  __typename?: "ideas_avg_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by avg() on columns of table "ideas" */
export type Ideas_Avg_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ideas". All fields are combined with a logical 'AND'. */
export type Ideas_Bool_Exp = {
  _and: Maybe<Array<Maybe<Ideas_Bool_Exp>>>;
  _not: Maybe<Ideas_Bool_Exp>;
  _or: Maybe<Array<Maybe<Ideas_Bool_Exp>>>;
  background_color: Maybe<Int_Comparison_Exp>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  description: Maybe<String_Comparison_Exp>;
  id: Maybe<Bigint_Comparison_Exp>;
  title: Maybe<String_Comparison_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  user: Maybe<Users_Bool_Exp>;
  user_id: Maybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "ideas" */
export enum Ideas_Constraint {
  /** unique or primary key constraint */
  IdeasPkey = "ideas_pkey",
}

/** input type for incrementing integer column in table "ideas" */
export type Ideas_Inc_Input = {
  background_color: Maybe<Scalars["Int"]>;
  id: Maybe<Scalars["bigint"]>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** input type for inserting data into table "ideas" */
export type Ideas_Insert_Input = {
  background_color: Maybe<Scalars["Int"]>;
  created_at: Maybe<Scalars["timestamptz"]>;
  description: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["bigint"]>;
  title: Maybe<Scalars["String"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  user: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** aggregate max on columns */
export type Ideas_Max_Fields = {
  __typename?: "ideas_max_fields";
  background_color: Maybe<Scalars["Int"]>;
  created_at: Maybe<Scalars["timestamptz"]>;
  description: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["bigint"]>;
  title: Maybe<Scalars["String"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** order by max() on columns of table "ideas" */
export type Ideas_Max_Order_By = {
  background_color: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  id: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Ideas_Min_Fields = {
  __typename?: "ideas_min_fields";
  background_color: Maybe<Scalars["Int"]>;
  created_at: Maybe<Scalars["timestamptz"]>;
  description: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["bigint"]>;
  title: Maybe<Scalars["String"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** order by min() on columns of table "ideas" */
export type Ideas_Min_Order_By = {
  background_color: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  id: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** response of any mutation on the table "ideas" */
export type Ideas_Mutation_Response = {
  __typename?: "ideas_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
  /** data of the affected rows by the mutation */
  returning: Array<Ideas>;
};

/** input type for inserting object relation for remote table "ideas" */
export type Ideas_Obj_Rel_Insert_Input = {
  data: Ideas_Insert_Input;
  on_conflict: Maybe<Ideas_On_Conflict>;
};

/** on conflict condition type for table "ideas" */
export type Ideas_On_Conflict = {
  constraint: Ideas_Constraint;
  update_columns: Array<Ideas_Update_Column>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** ordering options when selecting data from "ideas" */
export type Ideas_Order_By = {
  background_color: Maybe<Order_By>;
  created_at: Maybe<Order_By>;
  description: Maybe<Order_By>;
  id: Maybe<Order_By>;
  title: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  user: Maybe<Users_Order_By>;
  user_id: Maybe<Order_By>;
};

/** primary key columns input for table: "ideas" */
export type Ideas_Pk_Columns_Input = {
  id: Scalars["bigint"];
};

/** select columns of table "ideas" */
export enum Ideas_Select_Column {
  /** column name */
  BackgroundColor = "background_color",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Title = "title",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "ideas" */
export type Ideas_Set_Input = {
  background_color: Maybe<Scalars["Int"]>;
  created_at: Maybe<Scalars["timestamptz"]>;
  description: Maybe<Scalars["String"]>;
  id: Maybe<Scalars["bigint"]>;
  title: Maybe<Scalars["String"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** aggregate stddev on columns */
export type Ideas_Stddev_Fields = {
  __typename?: "ideas_stddev_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by stddev() on columns of table "ideas" */
export type Ideas_Stddev_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Ideas_Stddev_Pop_Fields = {
  __typename?: "ideas_stddev_pop_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by stddev_pop() on columns of table "ideas" */
export type Ideas_Stddev_Pop_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Ideas_Stddev_Samp_Fields = {
  __typename?: "ideas_stddev_samp_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by stddev_samp() on columns of table "ideas" */
export type Ideas_Stddev_Samp_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Ideas_Sum_Fields = {
  __typename?: "ideas_sum_fields";
  background_color: Maybe<Scalars["Int"]>;
  id: Maybe<Scalars["bigint"]>;
  user_id: Maybe<Scalars["bigint"]>;
};

/** order by sum() on columns of table "ideas" */
export type Ideas_Sum_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** update columns of table "ideas" */
export enum Ideas_Update_Column {
  /** column name */
  BackgroundColor = "background_color",
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Description = "description",
  /** column name */
  Id = "id",
  /** column name */
  Title = "title",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  UserId = "user_id",
}

/** aggregate var_pop on columns */
export type Ideas_Var_Pop_Fields = {
  __typename?: "ideas_var_pop_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by var_pop() on columns of table "ideas" */
export type Ideas_Var_Pop_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Ideas_Var_Samp_Fields = {
  __typename?: "ideas_var_samp_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by var_samp() on columns of table "ideas" */
export type Ideas_Var_Samp_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Ideas_Variance_Fields = {
  __typename?: "ideas_variance_fields";
  background_color: Maybe<Scalars["Float"]>;
  id: Maybe<Scalars["Float"]>;
  user_id: Maybe<Scalars["Float"]>;
};

/** order by variance() on columns of table "ideas" */
export type Ideas_Variance_Order_By = {
  background_color: Maybe<Order_By>;
  id: Maybe<Order_By>;
  user_id: Maybe<Order_By>;
};

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq: Maybe<Scalars["json"]>;
  _gt: Maybe<Scalars["json"]>;
  _gte: Maybe<Scalars["json"]>;
  _in: Maybe<Array<Scalars["json"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _lt: Maybe<Scalars["json"]>;
  _lte: Maybe<Scalars["json"]>;
  _neq: Maybe<Scalars["json"]>;
  _nin: Maybe<Array<Scalars["json"]>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root";
  /** delete data from the table: "ideas" */
  delete_ideas: Maybe<Ideas_Mutation_Response>;
  /** delete single row from the table: "ideas" */
  delete_ideas_by_pk: Maybe<Ideas>;
  /** delete data from the table: "users" */
  delete_users: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk: Maybe<Users>;
  /** insert data into the table: "ideas" */
  insert_ideas: Maybe<Ideas_Mutation_Response>;
  /** insert a single row into the table: "ideas" */
  insert_ideas_one: Maybe<Ideas>;
  /** insert data into the table: "users" */
  insert_users: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one: Maybe<Users>;
  /** perform the action: "login" */
  login: FusionAuthLoginResponse;
  /** perform the action: "signUp" */
  signUp: FusionAuthSignUpResponse;
  /** update data of the table: "ideas" */
  update_ideas: Maybe<Ideas_Mutation_Response>;
  /** update single row of the table: "ideas" */
  update_ideas_by_pk: Maybe<Ideas>;
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>;
};

/** mutation root */
export type Mutation_Root_Delete_IdeasArgs = {
  where: Ideas_Bool_Exp;
};

/** mutation root */
export type Mutation_Root_Delete_Ideas_By_PkArgs = {
  id: Scalars["bigint"];
};

/** mutation root */
export type Mutation_Root_Delete_UsersArgs = {
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_Root_Delete_Users_By_PkArgs = {
  id: Scalars["bigint"];
};

/** mutation root */
export type Mutation_Root_Insert_IdeasArgs = {
  objects: Array<Ideas_Insert_Input>;
  on_conflict: Maybe<Ideas_On_Conflict>;
};

/** mutation root */
export type Mutation_Root_Insert_Ideas_OneArgs = {
  object: Ideas_Insert_Input;
  on_conflict: Maybe<Ideas_On_Conflict>;
};

/** mutation root */
export type Mutation_Root_Insert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_Root_Insert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict: Maybe<Users_On_Conflict>;
};

/** mutation root */
export type Mutation_Root_LoginArgs = {
  loginId: Scalars["String"];
  password: Scalars["String"];
};

/** mutation root */
export type Mutation_Root_SignUpArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

/** mutation root */
export type Mutation_Root_Update_IdeasArgs = {
  _inc: Maybe<Ideas_Inc_Input>;
  _set: Maybe<Ideas_Set_Input>;
  where: Ideas_Bool_Exp;
};

/** mutation root */
export type Mutation_Root_Update_Ideas_By_PkArgs = {
  _inc: Maybe<Ideas_Inc_Input>;
  _set: Maybe<Ideas_Set_Input>;
  pk_columns: Ideas_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_Root_Update_UsersArgs = {
  _inc: Maybe<Users_Inc_Input>;
  _set: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** mutation root */
export type Mutation_Root_Update_Users_By_PkArgs = {
  _inc: Maybe<Users_Inc_Input>;
  _set: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = "asc",
  /** in the ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in the ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in the descending order, nulls first */
  Desc = "desc",
  /** in the descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in the descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

/** query root */
export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "ideas" */
  ideas: Array<Ideas>;
  /** fetch aggregated fields from the table: "ideas" */
  ideas_aggregate: Ideas_Aggregate;
  /** fetch data from the table: "ideas" using primary key columns */
  ideas_by_pk: Maybe<Ideas>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
};

/** query root */
export type Query_Root_IdeasArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** query root */
export type Query_Root_Ideas_AggregateArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** query root */
export type Query_Root_Ideas_By_PkArgs = {
  id: Scalars["bigint"];
};

/** query root */
export type Query_Root_UsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_Root_Users_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};

/** query root */
export type Query_Root_Users_By_PkArgs = {
  id: Scalars["bigint"];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "ideas" */
  ideas: Array<Ideas>;
  /** fetch aggregated fields from the table: "ideas" */
  ideas_aggregate: Ideas_Aggregate;
  /** fetch data from the table: "ideas" using primary key columns */
  ideas_by_pk: Maybe<Ideas>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
};

/** subscription root */
export type Subscription_Root_IdeasArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root_Ideas_AggregateArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root_Ideas_By_PkArgs = {
  id: Scalars["bigint"];
};

/** subscription root */
export type Subscription_Root_UsersArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root_Users_AggregateArgs = {
  distinct_on: Maybe<Array<Users_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Users_Order_By>>;
  where: Maybe<Users_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root_Users_By_PkArgs = {
  id: Scalars["bigint"];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq: Maybe<Scalars["timestamptz"]>;
  _gt: Maybe<Scalars["timestamptz"]>;
  _gte: Maybe<Scalars["timestamptz"]>;
  _in: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _lt: Maybe<Scalars["timestamptz"]>;
  _lte: Maybe<Scalars["timestamptz"]>;
  _neq: Maybe<Scalars["timestamptz"]>;
  _nin: Maybe<Array<Scalars["timestamptz"]>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users";
  created_at: Scalars["timestamptz"];
  email: Scalars["String"];
  external_user_id: Scalars["uuid"];
  id: Scalars["bigint"];
  /** An array relationship */
  ideas: Array<Ideas>;
  /** An aggregated array relationship */
  ideas_aggregate: Ideas_Aggregate;
  updated_at: Scalars["timestamptz"];
  username: Scalars["String"];
};

/** columns and relationships of "users" */
export type Users_IdeasArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** columns and relationships of "users" */
export type Users_Ideas_AggregateArgs = {
  distinct_on: Maybe<Array<Ideas_Select_Column>>;
  limit: Maybe<Scalars["Int"]>;
  offset: Maybe<Scalars["Int"]>;
  order_by: Maybe<Array<Ideas_Order_By>>;
  where: Maybe<Ideas_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: "users_aggregate";
  aggregate: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: "users_aggregate_fields";
  avg: Maybe<Users_Avg_Fields>;
  count: Maybe<Scalars["Int"]>;
  max: Maybe<Users_Max_Fields>;
  min: Maybe<Users_Min_Fields>;
  stddev: Maybe<Users_Stddev_Fields>;
  stddev_pop: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Users_Stddev_Samp_Fields>;
  sum: Maybe<Users_Sum_Fields>;
  var_pop: Maybe<Users_Var_Pop_Fields>;
  var_samp: Maybe<Users_Var_Samp_Fields>;
  variance: Maybe<Users_Variance_Fields>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields_CountArgs = {
  columns: Maybe<Array<Users_Select_Column>>;
  distinct: Maybe<Scalars["Boolean"]>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg: Maybe<Users_Avg_Order_By>;
  count: Maybe<Order_By>;
  max: Maybe<Users_Max_Order_By>;
  min: Maybe<Users_Min_Order_By>;
  stddev: Maybe<Users_Stddev_Order_By>;
  stddev_pop: Maybe<Users_Stddev_Pop_Order_By>;
  stddev_samp: Maybe<Users_Stddev_Samp_Order_By>;
  sum: Maybe<Users_Sum_Order_By>;
  var_pop: Maybe<Users_Var_Pop_Order_By>;
  var_samp: Maybe<Users_Var_Samp_Order_By>;
  variance: Maybe<Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict: Maybe<Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: "users_avg_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  id: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not: Maybe<Users_Bool_Exp>;
  _or: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at: Maybe<Timestamptz_Comparison_Exp>;
  email: Maybe<String_Comparison_Exp>;
  external_user_id: Maybe<Uuid_Comparison_Exp>;
  id: Maybe<Bigint_Comparison_Exp>;
  ideas: Maybe<Ideas_Bool_Exp>;
  updated_at: Maybe<Timestamptz_Comparison_Exp>;
  username: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersEmailKey = "users_email_key",
  /** unique or primary key constraint */
  UsersExternalUserIdKey = "users_external_user_id_key",
  /** unique or primary key constraint */
  UsersPkey = "users_pkey",
  /** unique or primary key constraint */
  UsersUsernameKey = "users_username_key",
}

/** input type for incrementing integer column in table "users" */
export type Users_Inc_Input = {
  id: Maybe<Scalars["bigint"]>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at: Maybe<Scalars["timestamptz"]>;
  email: Maybe<Scalars["String"]>;
  external_user_id: Maybe<Scalars["uuid"]>;
  id: Maybe<Scalars["bigint"]>;
  ideas: Maybe<Ideas_Arr_Rel_Insert_Input>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  username: Maybe<Scalars["String"]>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: "users_max_fields";
  created_at: Maybe<Scalars["timestamptz"]>;
  email: Maybe<Scalars["String"]>;
  external_user_id: Maybe<Scalars["uuid"]>;
  id: Maybe<Scalars["bigint"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  username: Maybe<Scalars["String"]>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at: Maybe<Order_By>;
  email: Maybe<Order_By>;
  external_user_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  username: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: "users_min_fields";
  created_at: Maybe<Scalars["timestamptz"]>;
  email: Maybe<Scalars["String"]>;
  external_user_id: Maybe<Scalars["uuid"]>;
  id: Maybe<Scalars["bigint"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  username: Maybe<Scalars["String"]>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at: Maybe<Order_By>;
  email: Maybe<Order_By>;
  external_user_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  updated_at: Maybe<Order_By>;
  username: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: "users_mutation_response";
  /** number of affected rows by the mutation */
  affected_rows: Scalars["Int"];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  created_at: Maybe<Order_By>;
  email: Maybe<Order_By>;
  external_user_id: Maybe<Order_By>;
  id: Maybe<Order_By>;
  ideas_aggregate: Maybe<Ideas_Aggregate_Order_By>;
  updated_at: Maybe<Order_By>;
  username: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars["bigint"];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Email = "email",
  /** column name */
  ExternalUserId = "external_user_id",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  Username = "username",
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at: Maybe<Scalars["timestamptz"]>;
  email: Maybe<Scalars["String"]>;
  external_user_id: Maybe<Scalars["uuid"]>;
  id: Maybe<Scalars["bigint"]>;
  updated_at: Maybe<Scalars["timestamptz"]>;
  username: Maybe<Scalars["String"]>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: "users_stddev_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  id: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: "users_stddev_pop_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  id: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: "users_stddev_samp_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  id: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: "users_sum_fields";
  id: Maybe<Scalars["bigint"]>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  id: Maybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Email = "email",
  /** column name */
  ExternalUserId = "external_user_id",
  /** column name */
  Id = "id",
  /** column name */
  UpdatedAt = "updated_at",
  /** column name */
  Username = "username",
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: "users_var_pop_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  id: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: "users_var_samp_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  id: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: "users_variance_fields";
  id: Maybe<Scalars["Float"]>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  id: Maybe<Order_By>;
};

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq: Maybe<Scalars["uuid"]>;
  _gt: Maybe<Scalars["uuid"]>;
  _gte: Maybe<Scalars["uuid"]>;
  _in: Maybe<Array<Scalars["uuid"]>>;
  _is_null: Maybe<Scalars["Boolean"]>;
  _lt: Maybe<Scalars["uuid"]>;
  _lte: Maybe<Scalars["uuid"]>;
  _neq: Maybe<Scalars["uuid"]>;
  _nin: Maybe<Array<Scalars["uuid"]>>;
};
