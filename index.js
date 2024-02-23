import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());


const apiKey = '55c173d041msh9a67660f610a926p157966jsn855ad1153ea4';
const translationEndpoint = 'https://google-translate1.p.rapidapi.com/language/translate/v2';

app.post('/translate', async (req, resp) => {
    const { text } = req.body;

    if (!text) {
        resp.status(400).json({ error: 'Request body not having text' });
        return;
    }

    
    const encodedParams = new URLSearchParams();
    encodedParams.set('q', text);
    encodedParams.set('target', 'fr');
    encodedParams.set('source', 'en');

    const options = {
        method: 'POST',
        url: translationEndpoint,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
     
        const response = await axios.request(options);
        
      
        const translatedText = response.data.data.translations[0].translatedText;

       
        resp.json({ translation: translatedText });
    } catch (error) {
     
        console.error('Translation error:', error);
        resp.status(500).json({ error: `Translation error: ${error.message}` });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
