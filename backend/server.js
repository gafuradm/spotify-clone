const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const songsRouter = require('./routes/songs');

const app = express();
const port = 5003;

app.use(cors());
app.use(bodyParser.json());

app.use('/songs', songsRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
