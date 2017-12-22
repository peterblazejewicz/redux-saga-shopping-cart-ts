import * as cors from 'cors';
import * as express from 'express';
import YamlDbContext, { DbContext } from './db/db-context';
import { api } from './routes';

const port = 8081;
const serverDelayConstant = 100;

const app = express();

let database: DbContext;

// Simulate a small amount of delay to demonstrate app's async features
app.use((req, res, next) => {
  const delay = (Math.random() * 15 + 5) * serverDelayConstant;
  setTimeout(next, delay);
});

app.use(express.static('public'));
app.use(cors());

app.use('/api', api);

app.get('/prices/:symbol/:ids', (req, res) => {
  const ids: string[] = req.params.ids.split(',');
  const items = ids.map(id => database.items.find(item => item.id === id));
  const supportedSymbols: Array<string> = ['CAD', 'USD'];
  const symbol: string = req.params.symbol;
  if (!supportedSymbols.includes(symbol)) {
    return res.status(403).json({
      error:
        'The currency symbol provided is inaccurate, see list of supported currencies',
      supportedSymbols
    });
  }

  if (items.includes(undefined)) {
    return res
      .status(500)
      .json({ error: 'A specified ID had no matching item' });
  } else {
    return res.status(200).json(
      items.map(item => ({
        id: item!.id,
        symbol,
        price: symbol === 'USD' ? item!.usd : item!.cad
      }))
    );
  }
});

app.get('/shipping/:items', (req, res) => {
  const ids: string[] = req.params.items.split(',');
  let total = 0;
  ids.forEach(id => {
    const item = database.items.find(item => item.id === id);
    if (item!.weight === 0) {
      total += 0;
    } else if (item!.weight < 0.5) {
      total += 3.5;
    } else {
      total += 8.5;
    }
  });
  res.status(200).json({
    total
  });
});

YamlDbContext.connect('database.yml')
  .then(db => {
    database = db;
    app.listen(port, () => {
      console.log(`Redux Saga Cart backend server is listening on ${port}`);
    });
  })
  .catch(error => console.error(error));
