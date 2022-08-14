import 'dotenv/config';
import ItemController from './modules/item/item.controller';
import UserController from './modules/user/user.controller';
import App from './app';

const app = new App(
  [new ItemController(), new UserController()],
  Number(process.env.PORT)
);

app.listen();
