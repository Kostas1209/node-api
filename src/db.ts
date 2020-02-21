import * as mongoose from "mongoose";
import config from '../config';

//mongoose.set("node-api", true);

// Connecting to the database
export default (async () => {
  try {
    await mongoose.connect(`${config.db_host}:${config.db_port}/${config.db_name}`, { useNewUrlParser: true });
    // listen for requests
    console.log("The Conection to database is Ok" + `${config.db_host}:${config.db_port}/${config.db_name}`);
  } catch (err) {
    console.log(err);
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();