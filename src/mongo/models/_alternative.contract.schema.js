// import { Schema, model, models, connection } from "mongoose";
// import { createModel } from "mongoose-gridfs";
// import dbConnect from "../dbConnect";

// const ContractSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const getContractModel = async () => {
//   await dbConnect();

//   // Create a Contract model using GridFS
//   const Contract =
//     models.Contract ||
//     createModel({
//       modelName: "Contract",
//       connection,
//       schema: ContractSchema,
//     });

//   return Contract;
// };

// // export const Contract = models.Contract || model("Contract", ContractSchema);
