const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const port = 3000;

const publicDir = path.join(__dirname, 'public');
app.enable('trust proxy');

const options = {
  target:'http://localhost:3000/', 
  changeOrigin: true, 
  router: {
    '/instructors':'http://68.183.60.166:3332', 
    '/reviews':'http://68.183.60.166:8000/', 
    '/repos':'http://ec2-54-83-163-142.compute-1.amazonaws.com/',
    '/':'http://54.152.27.113:80', 
  }
}

const apiProxy = proxy(options);
  
app.use('/instructors', apiProxy);
app.use('/reviews', apiProxy);
app.use('/repos', apiProxy);

app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});