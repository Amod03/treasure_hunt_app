import express from "express";
import { create_Register,login,update,fetchData } from '../controller/controller.js';

const routes = express.Router();

routes.route('/api/register')
  .post(create_Register);

routes.route('/api/login')
  .post(login)

  routes.route('/api/update/:id')
  .put(update)

  routes.route('/api/fetchData')
  .get(fetchData)

export { routes };
