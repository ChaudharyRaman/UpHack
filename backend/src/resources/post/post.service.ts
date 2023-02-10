import postModel from "../../resources/post/post.model";
import Post from "../../resources/post/post.interface";

class PostService {
    public post = postModel;
    
// Create New Post

    public async create(title:string, body:string): Promise<Post>{
        try {
            const post = await this.post.create({title,body});
            return post;
        } catch (error) {
            throw new Error('Unable To Create Post');
        }
    }

}

export default PostService;