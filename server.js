const app = require("./app");
const mongoose = require("mongoose");

const DbHost =
  "mongodb+srv://dmytro:OIcuitVJmVxgoViL@cluster0.ok7dign.mongodb.net/SmartStore?retryWrites=true&w=majority";

mongoose
  .connect(DbHost)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server running.");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
