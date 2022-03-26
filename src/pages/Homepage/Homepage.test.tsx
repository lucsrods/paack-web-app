import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Homepage from './Homepage';
import server from '../../mocks/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});

describe('Homepage', () => {
  it('should show a loading when data is loading', () => {
    render(<Homepage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should list all deliveries', async () => {
    render(<BrowserRouter><Homepage /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText(/Kub - Heidenreich/i)).toBeInTheDocument();
      expect(screen.getByText(/Tremblay Inc/i)).toBeInTheDocument();
      expect(screen.getByText(/Moore Group/i)).toBeInTheDocument();
    });
  });
});