import express from 'express';
import routes from './routes';
const app = express();
const PORT = 3500;

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
  console.log('MyBatch server listening on port ' + PORT);
  routes(app);
});
