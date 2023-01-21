const { mongoUser, mongoPass } = require('../config/config');
const { MongoClient, ServerApiVersion } = require('mongodb');
const {
  isPersianWithoutNumber,
  isNumber,
  correctCharacters,
  isEmail,
  // isPersianWithsymbol
} = require('../utils/validation');

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.bitnoqv.mongodb.net/?retryWrites=true&w=majority`;


class Controller {

  static get(req, res) {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(async (err) => {
      if (err) console.log(err);

      const collection = client.db("setude").collection("users");

      const { user, offset } = req.query;
      const query = user ? { fullName: new RegExp(user) } : {};
      const count = await collection.countDocuments(query);

      collection.find(query).skip((parseInt(offset) - 1) * 4).limit(5).toArray((err, result) => {
        if (err) console.log(err);
        else {
          client.close();
          res.send({ users: result, count });
        }
      });
    });

  }

  static post(req, res) {

    const { fullName, studentNumber, email, address } = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    if (!fullName.trim() || !studentNumber.trim() || !email.trim() || !address.trim()) {
      return res.status(400).send({ error: true, message: "همه مقادیر را وارد نمایید" });
    }

    if (!isPersianWithoutNumber(correctCharacters(fullName))) {
      return res.status(400).send({ error: true, message: "نام نامعتبر" });
    }
    if (!isNumber(correctCharacters(studentNumber))) {
      return res.status(400).send({ error: true, message: "شماره دانشجویی نامعتبر" });
    }
    if (!isEmail(correctCharacters(email))) {
      return res.status(400).send({ error: true, message: "ایمیل نامعتبر" });
    }
    // if (!isPersianWithsymbol(correctCharacters(address))) {
    //   return res.status(400).send({ error: true, message: "آدرس نامعتبر" });
    // }

    client.connect(async (err) => {
      if (err) console.log(err);

      const collection = client.db("setude").collection("users");

      collection.insertOne(req.body, (err, result) => {
        if (err) console.log(err);
        client.close();
        res.send({ success: true });
      });
    });
  }
}

module.exports = Controller