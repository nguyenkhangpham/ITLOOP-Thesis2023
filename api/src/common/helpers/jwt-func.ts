import jwt from 'jsonwebtoken';
import config from '@configs/configuration';
import Logger from '@helpers/logger';

const logger = Logger();
export const encoded = async (payload: PayloadDto): Promise<TokenDto> => {
  try {
    const result = {
      tokenType: 'Bearer',
      accessToken: await jwt.sign(
        {
          data: payload,
        },
        config.jwtAuth.jwtTokenSecret,
        { expiresIn: config.jwtAuth.jwtAccessTtl },
      ),
      refreshToken: await jwt.sign(
        {
          data: payload,
        },
        config.jwtAuth.jwtTokenSecret,
        { expiresIn: config.jwtAuth.jwtRefreshTtl },
      ),
    };

    return result;
  } catch (error: any) {
    logger.error(error.message);
  }
};

export const decoded = async (token: string): Promise<any> => {
  try {
    return await jwt.verify(token, config.jwtAuth.jwtTokenSecret);
  } catch (error: any) {
    logger.error(error.message);
    return null;
  }
};
