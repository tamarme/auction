import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import validate from './user.validation';
import UserService from './user.service';
import { authenticated } from '../../utils/middlewares/authenticated.middleware';

class UserController implements Controller {
  public path = '/user';
  public router = Router();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register.bind(this)
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login.bind(this)
    );

    this.router.post(`${this.path}`, authenticated, this.getUser.bind(this));
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password } = req.body;
      const token = await this.userService.register(
        email,
        username,
        password,
        'user'
      );
      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private getUser(req: Request, res: Response, next: NextFunction) {
    if (!req.user) return next(new HttpException(404, 'no logged in user'));
    res.status(200).json({ user: req.user });
  }
}

export default UserController;
