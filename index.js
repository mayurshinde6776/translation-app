import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
