import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import UserService from '../modules/user/user.service';
import RolesService from '../modules/role/role.service';
import ForbiddenException from '../exceptions/forbidden.exception';
import BadRequestException from '../exceptions/bad-request.exception';
import UnauthorizedException from '../exceptions/unauthorized.exception';

const authenticateMiddleware = (allowedRoles: string[] = []) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const token =
				req.cookies?.authToken || req.headers?.authorization?.split(' ')[1];

			if (!token) {
				return next(new BadRequestException('Authentication token missing'));
			}

			let decodedToken: JwtPayload | string;
			try {
				decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
			} catch (error: any) {
				console.log('INVALID TOKEN', error);
				return next(
					new UnauthorizedException(
						'Invalid authentication token',
						'InvalidTokenError',
					),
				);
			}

			if (typeof decodedToken === 'string') {
				return next(
					new BadRequestException('Invalid authentication token format'),
				);
			}

			const userId = decodedToken.userId;

			if (!userId) {
				return next(
					new UnauthorizedException(
						'Invalid authentication token',
						'InvalidTokenError',
					),
				);
			}

			const userService = new UserService(new RolesService());
			const user = await userService.findUserById(Number(userId));

			if (!user) {
				return next(
					new UnauthorizedException(
						'This account might have been blocked!',
						'AccountBlocked',
					),
				);
			}

			const userRoleName: string | undefined = user.role?.name;
			if (allowedRoles.length > 0) {
				const hasRequiredRole = allowedRoles.includes(userRoleName || '');
				if (!hasRequiredRole) {
					return next(
						new ForbiddenException(
							'You are not allowed to access this resource',
						),
					);
				}
			}

			req.user = { id: Number(userId), role: userRoleName || '' };
			next();
		} catch (error) {
			console.error('Authentication Middleware Error:', error);
			next(error);
		}
	};
};

export default authenticateMiddleware;
