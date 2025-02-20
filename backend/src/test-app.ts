import express from 'express';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.get('/test-error', (req, res, next) => {
	try {
		throw new Error('Test error from minimal app');
	} catch (error) {
		next(error);
	}
});

app.use(errorMiddleware);

app.listen(3001, () => {
	// Use a different port to avoid conflicts
	console.log('Minimal test app listening on port 3001');
});
