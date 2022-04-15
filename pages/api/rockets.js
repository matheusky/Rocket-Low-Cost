import { connectToDatabase } from "../../lib/mongodb";

import { ObjectId } from "mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const rocketdb = await db.collection("rockets");
  //console.log(req.method);
  //console.log(req.query.id);
  switch (req.method) {
    case "GET":
      // Get data from your database
      if (req.query.id == undefined) {
        const rockets = await rocketdb.find({}).toArray();
        res.statusCode = 200;
        res.send(rockets);
      } else {
        const rocketlist = await rocketdb
          .find({ userID: req.query.id })
          .toArray();
        res.statusCode = 200;
        res.send(rocketlist);
      }
      break;
    case "POST":
      // Add data to your database
      break;
    case "PUT":
      // Update or create data in your database
      const rocketData = await rocketdb.insertOne(req.body);
      if (rocketData.acknowledged == true) {
        res.statusCode = 200;
        res.send("Rocket added");
      } else {
        res.statusCode = 500;
        res.send("Rocket not added");
      }

      break;
    case "DELETE":
      // Delete data from your database
      const rocketDelete = await rocketdb.deleteOne({ _id: ObjectId(req.query.id) });
      if (rocketDelete.acknowledged == true) {
        res.statusCode = 200;
        res.send("rocket deleted");
      } else {
        res.statusCode = 500;
        res.send("Rocket not deleted");
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
