import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import Data from '../../lib/data';
import {StoredUserType} from '../../types/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, firstName, lastName, password, birthday } = req.body;
    if (!email || !firstName || !lastName || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }

    const users = Data.user.getList();
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }

    const newUser: StoredUserType = {
      id: userId,
      email,
      firstName,
      lastName,
      password: bcrypt.hashSync(password, 8);
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg'
    };

    Data.user.write([...users, newUser]);

    return res.end();
  }

  res.statusCode = 405;
  return res.end();
};