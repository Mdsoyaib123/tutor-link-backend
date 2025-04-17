import { Server } from 'http';
import mongoose from 'mongoose';
import { App } from './app';
import Config from './app/Config';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
let server: Server;

async function main() {
  try {
    await mongoose.connect(Config.db_url as string);
    // await mongoose.connect('mongodb://localhost:27017/bookGroupPoject');
    server = App.listen(5000, () => {
      console.log(`server running on port ${Config.port}`);
      // console.log(`server running on port 5000`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
