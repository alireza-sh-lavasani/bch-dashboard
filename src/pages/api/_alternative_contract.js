// import nextConnect from "next-connect";
// import multer from "multer";
// import { getContractModel } from "src/mongo/models/contract.schema";
// import dbConnect from "src/mongo/dbConnect";
// import { Readable } from "stream";

// const upload = multer(); // Use multer for handling multipart/form-data

// const handler = nextConnect({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end("Something broke!");
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end("not found");
//   },
// });

// handler.use(upload.single("file"));

// /**************************************
//  ******** Get contracts
//  *************************************/
// handler.get(async (req, res) => {
//   try {
//     // await dbConnect();
//     const Contract = await getContractModel();

//     const contracts = await Contract.find({});
//     res.status(200).json({ success: true, data: contracts });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false });
//   }
// });

// /**************************************
//  ******** Create new contract
//  *************************************/
// handler.post(async (req, res) => {
//   try {
//     const readableStream = Readable.from(req.file.buffer);

//     // await dbConnect();
//     const Contract = await getContractModel();

//     const { title } = req.body;

//     console.log(Contract);

//     const contract = await Contract.write(
//       {
//         filename: req.file.originalname,
//         contentType: req.file.mimetype,
//         metadata: {
//           title,
//         },
//       },
//       readableStream
//     );

//     await contract.save();

//     // Create a new object with only the necessary data
//     const responseData = {
//       _id: contract._id,
//       filename: contract.filename,
//       contentType: contract.contentType,
//       length: contract.length,
//       chunkSize: contract.chunkSize,
//       uploadDate: contract.uploadDate,
//       metadata: contract.metadata,
//     };

//     // const contract = await Contract.create();
//     res.status(201).json({ success: true, data: responseData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disabling Next.js' built-in body parser to use multer
//   },
// };

// export default handler;

export default function handler(req, res) {}
