import express, { Application } from 'express';
import cors from 'cors';
import { connect } from './utils/database';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './utils/middlewares/error.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Auction API',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
};

const specs = swaggerJSDoc(options);

class App {
  public express: Application;
  public port: number;

  constructor(controller: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initializeMiddlewares();
    this.initializeController(controller);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
  }

  private initializeController(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.express.use('/api', controller.router);
    });
  }

  private initializeDatabaseConnection() {
    connect();
  }

  private initializeErrorHandling() {
    this.express.use(errorMiddleware);
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }
}

export default App;
