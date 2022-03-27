import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';

import DetailsPage from './DetailsPage';
import server from '../../mocks/server';
import DeliveryContextProvider from '@Contexts/DeliveryContext';
import userEvent from '@testing-library/user-event';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
beforeEach(() => {
  render(
    <DeliveryContextProvider>
      <BrowserRouter>
        <Routes location={'/delivery/1'}>
          <Route path="/delivery/:id" element={<DetailsPage />} />
        </Routes>
      </BrowserRouter>
    </DeliveryContextProvider>
  );
});

describe('Details Page', () => {
  it('should mark an idle delivery as active', async () => {
    await waitFor(() => {
      expect(screen.getByText(/idle/i)).toBeInTheDocument();
    });

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button', { name: /make active/i}));
    });

    await waitFor(() => {
      expect(screen.getByText(/active/i)).toBeInTheDocument();
    });
  });

  it('should mark an active delivery as undelivered', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Undelivered', exact: true})).toBeInTheDocument();
    });

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Undelivered', exact: true }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Undelivered', exact: true})).not.toBeInTheDocument();
      expect(screen.getByText(/undelivered/i)).toBeInTheDocument();
    });
  });

  it('should mark an active delivery as delivered', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /make active/i}));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Delivered', exact: true})).toBeInTheDocument();
    });

    await waitFor(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Delivered', exact: true }));
    });

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: 'Delivered', exact: true})).not.toBeInTheDocument();
      expect(screen.getByText(/delivered/i)).toBeInTheDocument();
    });
  });

  it('should have a link to the active delivery', async () => {
    render(
      <DeliveryContextProvider>
        <BrowserRouter>
          <Routes location={'/delivery/2'}>
            <Route path="/delivery/:id" element={<DetailsPage />} />
          </Routes>
        </BrowserRouter>
      </DeliveryContextProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/go to active delivery/i)).toBeInTheDocument();
    });
  });
});
