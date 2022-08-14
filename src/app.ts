import express, { Application } from 'express';
import cors from 'cors';
import { connect } from './utils/database';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './utils/middlewares/error.middleware';

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
