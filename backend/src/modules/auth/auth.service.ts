import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UnauthorizedException from '../../exceptions/unauthorized.exception';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import UserService from '../user/user.service';
import { User } from '../user/entites/user.entity';

class AuthService {
	private userService: UserService;
	private readonly jwtSecretKey = process.env.JWT_SECRET_KEY || '';
	private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN || '4d';

	constructor(userService: UserService) {
		this.userService = userService;
	}

	public async registerUser(userData: any): Promise<any> {
		const { password } = userData;

		const hashedPassword = await bcrypt.hash(password, 10);
		userData.password = hashedPassword;

		const newUser = await this.userService.create(userData);

		const tokenPayload = {
			userId: newUser.id,
			email: newUser.email,
		};

		const token = this.generateJwtToken(tokenPayload);
		return { token, newUser };
	}

	public async loginUser(
		loginData: any,
	): Promise<{ token: string; user: User }> {
		const user = await this.userService.findByEmail(loginData.email);

		if (!user) {
			throw new UnauthorizedException('Invalid credentials', 'LoginError');
		}

		const { password, ...restUserData } = user;
		const passwordsMatched = await bcrypt.compare(
			loginData.password,
			password!,
		);

		if (!passwordsMatched) {
			throw new UnauthorizedException('Invalid credentials', 'LoginError');
		}

		const tokenPayload = {
			userId: user.id,
			email: user.email,
		};

		const token = this.generateJwtToken(tokenPayload);

		return { token, user: restUserData };
	}

	private generateJwtToken(payload: object): string {
		let token: string;
		try {
			token = jwt.sign(payload, this.jwtSecretKey, {
				expiresIn: this.jwtExpiresIn,
			} as jwt.SignOptions);
		} catch (error) {
			console.error('JWT signing error:', error);
			throw new InternalServerErrorException();
		}
		return token;
	}
}

export default AuthService;
