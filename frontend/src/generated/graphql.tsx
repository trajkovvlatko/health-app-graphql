import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  meal?: Maybe<Meal>;
  meals?: Maybe<Array<Meal>>;
  products?: Maybe<Array<Product>>;
  findProducts?: Maybe<Array<Product>>;
  mealTypes?: Maybe<Array<MealType>>;
  profile?: Maybe<User>;
};


export type QueryMealArgs = {
  id: Scalars['Int'];
};


export type QueryMealsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryFindProductsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Float'];
  user: User;
  mealType: MealType;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  mealProducts: Array<MealProduct>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  meals: Array<Meal>;
};

export type MealType = {
  __typename?: 'MealType';
  id: Scalars['Float'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MealProduct = {
  __typename?: 'MealProduct';
  id: Scalars['Float'];
  meal: Meal;
  product: Product;
  amount: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  name: Scalars['String'];
  measure: Scalars['String'];
  calories: Scalars['Float'];
  active: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal: Meal;
  addProduct: ProductResponse;
  login: UserResponse;
  register: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddMealArgs = {
  input: MealInput;
};


export type MutationAddProductArgs = {
  calories: Scalars['Float'];
  measure: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MealInput = {
  mealTypeId: Scalars['Float'];
  products: Array<ProductInput>;
};

export type ProductInput = {
  productId: Scalars['Float'];
  amount: Scalars['Float'];
};

export type ProductResponse = {
  __typename?: 'ProductResponse';
  error?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type MealFragment = (
  { __typename?: 'Meal' }
  & Pick<Meal, 'id'>
  & { mealType: (
    { __typename?: 'MealType' }
    & Pick<MealType, 'id' | 'name'>
  ), mealProducts: Array<(
    { __typename?: 'MealProduct' }
    & MealProductFragment
  )> }
);

export type MealProductFragment = (
  { __typename?: 'MealProduct' }
  & Pick<MealProduct, 'id' | 'amount' | 'createdAt'>
  & { product: (
    { __typename?: 'Product' }
    & ProductFragment
  ) }
);

export type MealTypeFragment = (
  { __typename?: 'MealType' }
  & Pick<MealType, 'id' | 'name'>
);

export type ProductFragment = (
  { __typename?: 'Product' }
  & Pick<Product, 'id' | 'name' | 'measure' | 'calories'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email'>
);

export type AddMealMutationVariables = Exact<{
  input: MealInput;
}>;


export type AddMealMutation = (
  { __typename?: 'Mutation' }
  & { addMeal: (
    { __typename?: 'Meal' }
    & MealFragment
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type FindProductsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type FindProductsQuery = (
  { __typename?: 'Query' }
  & { findProducts?: Maybe<Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'name' | 'measure' | 'calories'>
  )>> }
);

export type MealQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MealQuery = (
  { __typename?: 'Query' }
  & { meal?: Maybe<(
    { __typename?: 'Meal' }
    & MealFragment
  )> }
);

export type MealTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type MealTypeQuery = (
  { __typename?: 'Query' }
  & { mealTypes?: Maybe<Array<(
    { __typename?: 'MealType' }
    & MealTypeFragment
  )>> }
);

export type MealsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type MealsQuery = (
  { __typename?: 'Query' }
  & { meals?: Maybe<Array<(
    { __typename?: 'Meal' }
    & MealFragment
  )>> }
);

export type ProductsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products?: Maybe<Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'name' | 'measure' | 'calories'>
  )>> }
);

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = (
  { __typename?: 'Query' }
  & { profile?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export const ProductFragmentDoc = gql`
    fragment Product on Product {
  id
  name
  measure
  calories
}
    `;
export const MealProductFragmentDoc = gql`
    fragment MealProduct on MealProduct {
  id
  amount
  product {
    ...Product
  }
  createdAt
}
    ${ProductFragmentDoc}`;
export const MealFragmentDoc = gql`
    fragment Meal on Meal {
  id
  mealType {
    id
    name
  }
  mealProducts {
    ...MealProduct
  }
}
    ${MealProductFragmentDoc}`;
export const MealTypeFragmentDoc = gql`
    fragment MealType on MealType {
  id
  name
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
}
    `;
export const AddMealDocument = gql`
    mutation AddMeal($input: MealInput!) {
  addMeal(input: $input) {
    ...Meal
  }
}
    ${MealFragmentDoc}`;
export type AddMealMutationFn = Apollo.MutationFunction<AddMealMutation, AddMealMutationVariables>;

/**
 * __useAddMealMutation__
 *
 * To run a mutation, you first call `useAddMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMealMutation, { data, loading, error }] = useAddMealMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMealMutation(baseOptions?: Apollo.MutationHookOptions<AddMealMutation, AddMealMutationVariables>) {
        return Apollo.useMutation<AddMealMutation, AddMealMutationVariables>(AddMealDocument, baseOptions);
      }
export type AddMealMutationHookResult = ReturnType<typeof useAddMealMutation>;
export type AddMealMutationResult = Apollo.MutationResult<AddMealMutation>;
export type AddMealMutationOptions = Apollo.BaseMutationOptions<AddMealMutation, AddMealMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    error
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FindProductsDocument = gql`
    query FindProducts($name: String!) {
  findProducts(name: $name) {
    id
    name
    measure
    calories
  }
}
    `;

/**
 * __useFindProductsQuery__
 *
 * To run a query within a React component, call `useFindProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFindProductsQuery(baseOptions?: Apollo.QueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
        return Apollo.useQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
      }
export function useFindProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProductsQuery, FindProductsQueryVariables>) {
          return Apollo.useLazyQuery<FindProductsQuery, FindProductsQueryVariables>(FindProductsDocument, baseOptions);
        }
export type FindProductsQueryHookResult = ReturnType<typeof useFindProductsQuery>;
export type FindProductsLazyQueryHookResult = ReturnType<typeof useFindProductsLazyQuery>;
export type FindProductsQueryResult = Apollo.QueryResult<FindProductsQuery, FindProductsQueryVariables>;
export const MealDocument = gql`
    query Meal($id: Int!) {
  meal(id: $id) {
    ...Meal
  }
}
    ${MealFragmentDoc}`;

/**
 * __useMealQuery__
 *
 * To run a query within a React component, call `useMealQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMealQuery(baseOptions?: Apollo.QueryHookOptions<MealQuery, MealQueryVariables>) {
        return Apollo.useQuery<MealQuery, MealQueryVariables>(MealDocument, baseOptions);
      }
export function useMealLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealQuery, MealQueryVariables>) {
          return Apollo.useLazyQuery<MealQuery, MealQueryVariables>(MealDocument, baseOptions);
        }
export type MealQueryHookResult = ReturnType<typeof useMealQuery>;
export type MealLazyQueryHookResult = ReturnType<typeof useMealLazyQuery>;
export type MealQueryResult = Apollo.QueryResult<MealQuery, MealQueryVariables>;
export const MealTypeDocument = gql`
    query MealType {
  mealTypes {
    ...MealType
  }
}
    ${MealTypeFragmentDoc}`;

/**
 * __useMealTypeQuery__
 *
 * To run a query within a React component, call `useMealTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealTypeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMealTypeQuery(baseOptions?: Apollo.QueryHookOptions<MealTypeQuery, MealTypeQueryVariables>) {
        return Apollo.useQuery<MealTypeQuery, MealTypeQueryVariables>(MealTypeDocument, baseOptions);
      }
export function useMealTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealTypeQuery, MealTypeQueryVariables>) {
          return Apollo.useLazyQuery<MealTypeQuery, MealTypeQueryVariables>(MealTypeDocument, baseOptions);
        }
export type MealTypeQueryHookResult = ReturnType<typeof useMealTypeQuery>;
export type MealTypeLazyQueryHookResult = ReturnType<typeof useMealTypeLazyQuery>;
export type MealTypeQueryResult = Apollo.QueryResult<MealTypeQuery, MealTypeQueryVariables>;
export const MealsDocument = gql`
    query Meals($skip: Int, $take: Int) {
  meals(skip: $skip, take: $take) {
    ...Meal
  }
}
    ${MealFragmentDoc}`;

/**
 * __useMealsQuery__
 *
 * To run a query within a React component, call `useMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMealsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useMealsQuery(baseOptions?: Apollo.QueryHookOptions<MealsQuery, MealsQueryVariables>) {
        return Apollo.useQuery<MealsQuery, MealsQueryVariables>(MealsDocument, baseOptions);
      }
export function useMealsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MealsQuery, MealsQueryVariables>) {
          return Apollo.useLazyQuery<MealsQuery, MealsQueryVariables>(MealsDocument, baseOptions);
        }
export type MealsQueryHookResult = ReturnType<typeof useMealsQuery>;
export type MealsLazyQueryHookResult = ReturnType<typeof useMealsLazyQuery>;
export type MealsQueryResult = Apollo.QueryResult<MealsQuery, MealsQueryVariables>;
export const ProductsDocument = gql`
    query Products($skip: Int, $take: Int) {
  products(skip: $skip, take: $take) {
    name
    measure
    calories
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    email
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, baseOptions);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;