import nextConnect from "next-connect";
import dbConnect from "src/mongo/dbConnect";
import { Contract } from "src/mongo/models/contract.schema";

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("not found");
  },
});

// handler.use(); // apply middlewares

/**************************************
 ******** Get contracts
 *************************************/
handler.get(async (req, res) => {
  try {
    await dbConnect();

    const contracts = await Contract.find({});
    res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

/**************************************
 ******** Create new contract
 *************************************/
handler.post(async (req, res) => {
  try {
    await dbConnect();
    const { title } = req.body;

    const contract = await Contract.create({ title });

    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
});

export default handler;
