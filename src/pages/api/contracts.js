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
    throw error;
  }
});

/**************************************
 ******** Create new contract
 *************************************/
handler.post(async (req, res) => {
  try {
    await dbConnect();

    const contract = await Contract.create(req.body);

    if (contract) res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(error?.status || 500).json({ error: error?.message || "Internal server error!" });
  }
});

export default handler;
