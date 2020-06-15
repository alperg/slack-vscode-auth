require('dotenv').config();
const express = require('express');
const request = require('request');
const PORT = process.env.PORT || 8090;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/auth/redirect', (req, res) =>{
    console.log(process.env.CLIENT_ID);
    console.log(process.env.CLIENT_SECRET);
    console.log(process.env.REDIRECT_URI);
    const options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    };
    
    request(options, (error, response, body) => {
        const JSONresponse = JSON.parse(body);
        
        if (!JSONresponse.ok){
            console.log(JSONresponse);
            res.send("Error encountered: \n" + JSON.stringify(JSONresponse)).status(200).end();
        } else {
            console.log(JSONresponse);
            res.send("Success!");
        }
    });
});

app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`);
});
