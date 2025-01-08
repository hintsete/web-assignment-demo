import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(403).send({
        error:
          "No Authentication Token provided or Doesn't follow Bearer format",
      });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(403).send({
        error: 'Invalid authentication token',
      });
    }
  }
}
