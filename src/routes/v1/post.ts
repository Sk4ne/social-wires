import { Router } from 'express'
import { addPost, deletePost, getPost, getPosts, getPostsFilter, updatePost } from '../../controllers/postController';
const router:Router = Router();

router
  .post('/post',addPost)
  .get('/posts',getPosts)
  /* post filter */
  .get('/posts/filter',getPostsFilter)
  .get('/post/:id',getPost)
  .put('/post/:id',updatePost)
  .delete('/post/:id',deletePost)


export default router;