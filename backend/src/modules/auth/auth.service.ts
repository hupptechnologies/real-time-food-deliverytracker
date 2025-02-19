class AuthService {
	public async registerUser(userData: any): Promise<any> {
		return {
			id: 1,
			username: userData.username || 'testuser',
			email: userData.email || 'test@example.com',
		};
	}

	public async loginUser(_loginData: any): Promise<string> {
		return 'dummy-jwt-token';
	}
}

export default AuthService;
