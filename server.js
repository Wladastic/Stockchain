const express = require('express');
const cors = require('cors')
const Controller = require('./controller');

const app = express();
app.use(cors());

const port = 3000;

app.get('/health-check', (req, res) => res.send('alles gut'));
app.get('/getCurrentState', Controller.getCurrentState);
app.get('/setNewState', Controller.submitNewQuantityAndReason);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
