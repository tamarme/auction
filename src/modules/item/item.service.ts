import ItemModel from './item.model';
import Item from './item.interface';

class ItemService {
  public async create(title: string, description: string): Promise<Item> {
    try {
      const item = await ItemModel.create({ title, description });
      return item;
    } catch (error) {
      throw new Error('item was not created');
    }
  }
}

export default ItemService;
