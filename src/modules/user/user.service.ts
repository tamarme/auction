import UserModel from './user.model';
import { createToken } from '../../utils/token';

class UserService {
  public async register(
    email: string,
    username: string,
    password: string,
    role: string
  ) {
    try {
      const user = await UserModel.create({ email, username, password, role });
      const accessToken = createToken(user);
      return accessToken;
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  public async login(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) throw new Error('Unable to find user');

      if (await user.isValidPassword(password)) return createToken(user);
      else throw new Error('Incorrect credentials');
    } catch (error) {
      throw new Error('Incorrect credentials');
    }
  }
}

export default UserService;
