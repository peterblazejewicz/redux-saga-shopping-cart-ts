import * as cors from 'cors';
import * as express from 'express';
import YamlDbContext from './db/db-context';
import { api } from './routes';

const port = 8081;
const serverDelayConstant = 100;

const app = express();

// Simulate a small amount of delay to demonstrate app's async features
app.use((req, res, next) => {
  const delay = (Math.random() * 15 + 5) * serverDelayConstant;
  setTimeout(next, delay);
});

app.use(express.static('public'));
app.use(cors());

app.use('/api', api);

YamlDbContext.connect('database.yml')
  .then(db => {
    app.listen(port, () => {
      console.log(`Redux Saga Cart backend server is listening on ${port}`);
    });
  })
  .catch(error => console.error(error));
