import app from './index';
import { AppDataSource } from './data-source';
import 'dotenv/config';

AppDataSource.initialize().then(() => {
	console.log('Database connected!');

	const PORT = process.env.PORT || 3001;

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}!`);
	});
}).catch(error => {
	console.log(error);
});
