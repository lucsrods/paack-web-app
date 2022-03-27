import { rest } from 'msw';
import { setupServer } from 'msw/node';

import deliveries from './deliveries';

const API = process.env.REACT_APP_API;

const handlers = [
  rest.get(`${API}/deliveries`, (req, res, ctx) => {
    return res(
      ctx.json(deliveries)
    );
  }),
  rest.put(`${API}/deliveries/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
    );
  })
];

const server = setupServer(...handlers);

export default server;