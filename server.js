import * as dotenv from 'dotenv';

// this does is to allow our environment variables to be accessed
dotenv.config();

// initializing open ai sdk
import { Configuration, OpenAIApi } from 'openai';

// creating configuration object
const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

// then we can use this same configuration to initialize open ai sdk
const openai = new OpenAIApi(configuration);

// express js is an extremely popular + minimal framework for node js
import express from 'express';
import cors from 'cors';

// cool thing about express is, when a request comes in, we can apply middleware, which is code that will run on each request

// most importantly we want to import a library 'cors' which stands for cross-origin resource sharing

// cors is a security mechanism

const app = express();

app.use(cors());

// another piece of middleware, we want to use is express.json
// this tells to our api that we want to handle data only in json format
app.use(express.json());

// there are many data formats that can be transferred over http...but json format is the most common format


// Now our middleware is configured


// let's create our first endpoint 

// there are many http methods like get post fetch delete
// here post is most suitable because here we are creating a new piece of data

// post -> 2 args
// 1st args -> url of the api https://localhost:8080/dream
// 2nd args -> callback function that has a request and response object, we can interact with!
//this callback function will be called everytime someone navigates to this url
app.post('/dream', async(req, res) => {

    try{
        const prompt = req.body.prompt;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data.data[0].url;
        res.send( { image });
    }  catch(error){
        
    }
    
});

// 2nd arg is optional which is a callback
app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));


