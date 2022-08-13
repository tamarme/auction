import 'dotenv/config';
import ItemController from './modules/item/item.controller';
import App from './app';

const app = new App([new ItemController()], Number(process.env.PORT));

app.listen();
