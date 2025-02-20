import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.route';
import adminRoutes from './modules/admin/admin.route';
import { AppDataSource } from './config/database.config';
import { DataSource } from 'typeorm';
import errorMiddleware from './middlewares/error.middleware';

class App {
	public app: Express;
	public port: number;
	public dataSource: DataSource;

	private static instance: App | null = null;

	private constructor(port?: number) {
		this.app = express();
		this.port = port || 3000;
		this.dataSource = AppDataSource;

		this.initializeDatabaseConnection(); // 1. Database
		this.initializeMiddleware(); // 2. Middleware
		this.initializeRoutes(); // 3. Routes
		this.initializeErrorHandling(); // 4. Error Handling <--- IS THIS REALLY #4?
	}

	public static getInstance(port?: number): App {
		if (!App.instance) {
			App.instance = new App(port);
		}
		return App.instance;
	}

	private async initializeDatabaseConnection(): Promise<void> {
		try {
			await this.dataSource.initialize();
			console.log('Connected to database successfully!');
		} catch (err) {
			console.error('Error initializing Data Source:', err);
			process.exit(1);
		}
	}

	private initializeMiddleware() {
		this.app.use(cors());
		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes() {
		this.app.get('/', (_req: Request, res: Response) => {
			res.status(200).send('Hello world!');
		});
		this.app.use('/api/auth', authRoutes);
		this.app.use('/api/admin', adminRoutes);
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening http://localhost:${this.port}`);
		});
	}
}

export default App;
