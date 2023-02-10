import 'module-alias/register';
import { config } from 'dotenv';
config();
// import 'module-alias';
import App from './app';
import validateEnv from './utils/validateEnv';
import PostController from './resources/post/post.controller';
import UserController from './resources/user/user.controller';
import HackathonController from './resources/hackathon/hackathon.controller';

validateEnv();

const app = new App([
    new PostController(),
    new UserController(),
    new HackathonController()
],Number(process.env.PORT));

app.listen();
