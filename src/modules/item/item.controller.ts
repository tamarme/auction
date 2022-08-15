import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import validate from './item.validation';
import ItemService from './item.service';

class ItemController implements Controller {
  public path = '/items';
  public router = Router();
  private itemService = new ItemService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @openapi
     * /:
     *   get:
     *     description: Welcome to swagger-jsdoc!
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    this.router.get('/', (req: Request, res: Response) => {
      res.send('Hello');
    });

    /**
     * @openapi
     * /:
     *   post:
     *     description: Welcome to swagger-jsdoc!
     *     responses:
     *       200:
     *         description: Returns a mysterious string.
     */
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create.bind(this)
    );
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { title, description } = req.body;
      const item = await this.itemService.create(title, description);
      res.status(201).json({ item });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
}

export default ItemController;
