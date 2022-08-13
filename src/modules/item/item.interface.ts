import { Document } from 'mongoose';

interface Item extends Document {
  title: string;
  description: string;
}

export default Item;
