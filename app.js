const express = require ('express');
const app = express();

const bodyParser = require('body-parser')
const { getPaletteFromURL} = require('color-thief-node');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
      return res.send(200);
    } else {
      return next();
    }
  });

  async function handleApiCall (req,res) {
    const colorPallete = await getPaletteFromURL(req.body.input)
  if(colorPallete) {
    res.send(colorPallete)
  }

  }

app.post('/cors', (req, res) => {handleApiCall(req,res)})

const port = 4000;
app.listen(port, process.env.IP, function() {
    console.log(`server is running on port ${port}`);

})