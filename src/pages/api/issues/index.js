import nextConnect from "next-connect";
import dbConnect from "src/mongo/dbConnect";
import { Issue } from "src/mongo/models/issue.schema"

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
 ******** Get Issues
 *************************************/
handler.get(async (req, res) => {
  try {
    await dbConnect();

    const issue = await Issue.find({});
    res.status(200).json(issue);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

/**************************************
 ******** Create new Issue
 *************************************/
handler.post(async (req, res) => {
  try {
    await dbConnect();

    const issue = await Issue.create(req.body);

    if (issue) res.status(201).json(issue);
  } catch (error) {
    console.error(error);
    res.status(error?.status || 500).json({ error: error?.message || "Internal server error!" });
  }
});

export default handler;
