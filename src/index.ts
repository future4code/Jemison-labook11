import { app } from './controller/app'
import { postRouter } from './routes/postRouter';
import { loginRouter } from './routes/loginRouter';
import { userRouter } from './routes/userRouter'
import { friendshipRouter } from './routes/friendshipRouter';

app.use('/', loginRouter)

app.use('/user/', userRouter)

app.use('/post', postRouter)

app.use('/friendship', friendshipRouter)
