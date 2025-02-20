import { IsString, IsEmail, MinLength, IsDefined } from 'class-validator';

export class AuthDto {
	@IsDefined({ message: 'Email is a required field' })
	@IsEmail({}, { message: 'Invalid email format' })
	readonly email!: string;

	@IsDefined({ message: 'Password is a required field' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	readonly password!: string;
}
