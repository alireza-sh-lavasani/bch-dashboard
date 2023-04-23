import { Schema, model, models, connection } from "mongoose";

const ContractSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contract = models.Contract || model("Contract", ContractSchema);
