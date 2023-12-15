const express = require('express');
const userRouter = require('./routes/user');
const matchRouter = require('./routes/match');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/match', matchRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
