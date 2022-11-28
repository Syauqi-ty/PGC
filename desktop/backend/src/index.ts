import { createConnection } from "typeorm";

createConnection()
  .then(async () => {
    console.log("DB Connected");
  })
  .catch((error) => console.log(error));
