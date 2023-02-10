import { Router ,Request, Response ,NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from '../../middlewares/validation.middleware';
import validate from "../../resources/post/post.validation";
import PostService from '../../resources/post/post.service';

class PostController implements Controller {
    public path= '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes():void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req: Request,
        res:Response,
        next:NextFunction
    ):Promise<Response | void> =>{
        try {
            const {title , body} = req.body;
            const post = await this.PostService.create(title,body);
            return res.status(201).json({post});
        } catch (error:any) {
            next(new HttpException(400,'Cannot Create Post'));
        }
    }
}

export default PostController;

