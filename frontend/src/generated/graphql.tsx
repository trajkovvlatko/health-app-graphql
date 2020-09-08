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
  product?: Maybe<Product>;
  products?: Maybe<Array<Product>>;
};


export type QueryMealArgs = {
  id: Scalars['Int'];
};


export type QueryMealsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};


export type QueryProductsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Float'];
  mealType: Scalars['String'];
  products?: Maybe<Array<Product>>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  name: Scalars['String'];
  meals?: Maybe<Array<Meal>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMeal: Meal;
};


export type MutationAddMealArgs = {
  input: MealInput;
};

export type MealInput = {
  mealType: Scalars['String'];
};

export type MealFragmentFragment = (
  { __typename?: 'Meal' }
  & Pick<Meal, 'id' | 'mealType'>
);

export type AddMealMutationVariables = Exact<{
  input: MealInput;
}>;


export type AddMealMutation = (
  { __typename?: 'Mutation' }
  & { addMeal: (
    { __typename?: 'Meal' }
    & Pick<Meal, 'id' | 'mealType'>
  ) }
);

export type MealsQueryVariables = Exact<{
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;


export type MealsQuery = (
  { __typename?: 'Query' }
  & { meals?: Maybe<Array<(
    { __typename?: 'Meal' }
    & MealFragmentFragment
  )>> }
);

export const MealFragmentFragmentDoc = gql`
    fragment MealFragment on Meal {
  id
  mealType
}
    `;
export const AddMealDocument = gql`
    mutation AddMeal($input: MealInput!) {
  addMeal(input: $input) {
    id
    mealType
  }
}
    `;
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
export const MealsDocument = gql`
    query Meals($skip: Int, $take: Int) {
  meals(skip: $skip, take: $take) {
    ...MealFragment
  }
}
    ${MealFragmentFragmentDoc}`;

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