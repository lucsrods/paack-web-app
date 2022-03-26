import { rest } from 'msw';
import { setupServer } from 'msw/node';

import deliveries from './deliveries';

const API = process.env.REACT_APP_API;

const handlers = [
  // Handles a GET /user request
  rest.get(`${API}/deliveries`, (req, res, ctx) => {
    return res(
      ctx.json(deliveries)
    );
  }),
];

const server = setupServer(...handlers);

export default server;