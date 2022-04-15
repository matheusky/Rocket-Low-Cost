import { connectToDatabase } from "../../lib/mongodb";

import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const usersDB = await db.collection("Users");
  //console.log(req.method);
  //console.log(req.query.id);
  switch (req.method) {
    case "GET":
      // Get data from your database
      if (req.query.id === undefined) {
        const data = await usersDB.find({}).toArray();
        res.statusCode = 200;
        res.send(JSON.parse(JSON.stringify(data)));
      }
      if (req.query.id !== undefined) {
        var o_id = new ObjectId(req.query.id);
        const data = await usersDB.find({ _id: o_id }).toArray();

        if (data.length === 0) {
          res.statusCode = 404;
          res.send("User not found");
        } else {
          res.statusCode = 200;
          res.send(JSON.parse(JSON.stringify(data)));
        }
      }
      break;
    case "POST":
      // Add data to your database

      break;
    case "PUT":
      // Update or create data in your database
      //console.log(req.body);
      if (req.body.name === undefined || req.body.idade === undefined) {
        res.statusCode = 400;
        res.send("Invalid data");
      } else if (req.body.name === "" || req.body.idade === "") {
        res.statusCode = 400;
        res.send("Invalid data");
      } else {
        const usr = await usersDB.find({}).toArray();
        let UserExists = false;
        usr.forEach((user) => {
          if (user.name === req.body.name) {
            res.statusCode = 409;
            res.send("User already exists");
            UserExists = true;
          }
        });
        if (UserExists === false) {
          const data = await usersDB.insertOne({
            name: req.body.name,
            idade: req.body.idade,
          });
          res.statusCode = 200;
          res.send(JSON.parse(JSON.stringify(data)));
        }
      }
      break;
    case "DELETE":
      // Delete data from your database

      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
