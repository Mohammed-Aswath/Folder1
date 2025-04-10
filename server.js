const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle POST request from Unreal
app.get('/trigger', (req, res) => {
    console.log('Unreal sent:', req.query);
  
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Door Status</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
              h1 { color: blue; }
            </style>
          </head>
          <body>
            <h1>PASSED DOOR</h1>
          </body>
        </html>
      `;
      fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), htmlContent);
   
    
    res.json({ status: 'received' });
  });
  
// Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});