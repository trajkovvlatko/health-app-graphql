import React from 'react';
import AuthInfo from './Info';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import {ProfileDocument} from 'generated/graphql';
import {render, screen} from '@testing-library/react';

const TestComponent = () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: ProfileDocument,
      },
      result: {
        data: {
          profile: {id: 1, email: 'email@email.com'},
        },
      },
    },
  ];

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthInfo />
    </MockedProvider>
  );
};

it('renders the AuthInfo component', async () => {
  render(<TestComponent />);
  expect(screen.getByTestId('auth-info')).toBeInTheDocument();
  expect(await screen.findByText(/email@email.com/i)).toBeInTheDocument();
  expect(screen.getByTestId('auth-info-label').textContent).toEqual(
    'Logged in: email@email.com',
  );
});
