import express from 'express';
import bodyParser from 'body-parser';
import expresPartial from 'express-partials'
import connectToDb from './db/connect';
import user from './routes/users.routes';
import group from './routes/groups.routes';
import view from './routes/views.routes';

const server = express();

connectToDb();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(expresPartial());

server.use(express.static('wwwroot'));
server.set('view engine', 'ejs');

server.use(user);
server.use(group);
server.use(view);

server.use((err, req, res, next) => {
	return res.status(404).json({
		isSuccess: false,
		message: err.message
	});
});

server.listen(3000, () => {
    console.log('Server started at: 3000');
});

