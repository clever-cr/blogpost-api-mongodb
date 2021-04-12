
import express from "express";
import mongoose from "mongoose";
import bodyParse from "body-parser";
import dotenv from "dotenv";
import router from './server/routes/Authroute';
import blogrouter from './server/routes/blogRoute';
import commentRoute from './server/routes/commentRoute';

dotenv.config({ path: "./.env" });
const app = express();
app.use(bodyParse.json());
app.use('/api/v1/blogpost', router);
app.use('/api/v1/blogpost', blogrouter);
app.use('/api/v1/blogpost/comment',commentRoute);



app.use('/', (req, res) => {
    res.status(200).send({
        statu: 200,
        message: "this route doesn't exist"
    })
})

const databaseUrl = process.env.DATABASE
mongoose.connect(databaseUrl, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false }).then(() => { 
        console.log("db successfully connected") 
    })
const port = process.env.PORT;




app.listen(port, () => {

    console.log(`sever is running on port ${port}`);
})

export default app;
