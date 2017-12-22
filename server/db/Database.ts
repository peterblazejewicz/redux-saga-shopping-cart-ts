import { DatabaseModel } from './../models/Database';
import * as YAML from 'yamljs';

interface State {
  db: DatabaseModel | null;
}
const state: State = {
  db: null
};

const connect: (path: string) => Promise<DatabaseModel> = path => {
  return new Promise((resolve, reject) => {
    try {
      YAML.load(path, (database: DatabaseModel) => {
        state.db = database;
        resolve(database);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { connect };
