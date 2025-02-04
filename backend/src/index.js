import app from './app.js';
import './db.js';

const port = app.get('port');

app.listen(port, () =>
  console.log('> Server is up and running on port : ' + port)
);
