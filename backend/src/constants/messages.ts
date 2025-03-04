export const authMessages = {
	REGISTER_SUCCESS: 'User registerd successfully!',
	INVALID_CREDENTIALS: 'Invalid credentials',
	LOGIN_SUCCESS: 'Logged in successfully',
};

export const orderMessages = {
	INIT_SUCCESS: 'Order initiated!',
	INIT_FAILED: 'Failed to initiate order!',
	HISTORY_FETCH_SUCCESS: 'Order history fetched successfully!',
	DETAILS_FETCH_SUCCESS: 'Order details fetched successfully!',
	NOT_FOUND: 'Order not found with ID ',
	DUPLECATE_ORDER_NUMBER: 'Order with this Order Number already exist',
};

export const roleMessages = {
	CREATE_SUCCESS: 'New Role added!',
	DUPLECATE_ROLE_NAME: 'Role with this name already exists',
	UPDATE_SUCCESS: 'Role updated!',
	DETAIL_FETCH_SUCCESS: 'Role details fetched successfully!',
	NOT_FOUND: 'Role not found with ID ',
	LIST_FETCH_SUCCESS: 'Roles fetched successfully!',
	DELETE_SUCCESS: 'Role deleted!',
};

export const userMessage = {
	CREATE_SUCCESS: 'New user added!',
	DUPLICATE_EMAIL: 'An account with this email already exist',
	INVALID_ROLE_ID: 'Invalid Role ID provided',
	DEFAULT_ROLE_NOT_FOUND:
		'Failed to create the account, default role not found',
	NOT_FOUND: 'User not found!',
	DETAILS_FETCH_SUCCESS: 'User details fetched successfully!',
	LIST_FETCH_SUCCESS: 'Users fetched successfully!',
	UPDATE_SUCCESS: 'User details updated!',
	DELETE_SUCCESS: 'User deleted!',
};
