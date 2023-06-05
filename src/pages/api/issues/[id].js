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

/**************************************
 ******** Get Issue by Id
 *************************************/
handler.get(async (req, res) => {
  try {
    await dbConnect();
    
    const issue = await Issue.findById(req.query.id);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    res.status(200).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

export default handler;
