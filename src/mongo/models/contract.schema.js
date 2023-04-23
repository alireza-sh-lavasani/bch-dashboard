import { Schema, model, models } from "mongoose";

const ContractSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      require: true,
    },
    issuePrice: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      min: [100, "value must be in range of 0 - 100"],
      required: true,
    },
    issueMethod: {
      type: String,
      enum: ["GLOBAL_CERTIFICATE", "UNCERTIFICATED"],
      required: true,
    },
    denominationCurrency: {
      type: String,
      enum: ["EUR", "USD", "GBP", "CHF", "JPY", "RUB"],
      required: true,
    },
    maxAmount: {
      type: Number,
      min: [0, "value must be greater than 0"],
      required: true,
    },
    nominalValue: {
      type: Number,
      min: [0, "value must be greater than 0"],
      required: true,
    },
    centralSecuritiesDepository: {
      type: String,
      enum: ["Clearstream", "Euroclear", "SIX"],
      required: true,
    },
    scheduledMaturityDate: {
      type: Date,
      require: true,
    },
    redemptionPrice: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      min: [100, "value must be in range of 0 - 100"],
      required: true,
    },
    redemption: {
      type: String,
      enum: ["UNDER_PAR", "AT_PAR"],
      required: true,
    },
    interestType: {
      type: String,
      enum: ["FIXED_RATE", "VARIABLE_RATE", "ZERO_COUPON", "OTHER"],
      required: true,
    },
    interestRate: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      min: [100, "value must be in range of 0 - 100"],
      required: true,
    },
    dayCountFraction: {
      type: String,
      enum: ["30/360", "ACT/ACT"],
      required: true,
    },
    interestPaymentFrequency: {
      type: String,
      enum: ["WEEKLY", "MONTHLY", "QUARTERLY", "SEMI_ANNUALLY", "YEARLY", "OTHER"],
      required: true,
    },
    couponDates: {
      type: String,
      enum: ["ADJUSTED", "UNADJUSTED"],
      required: true,
    },
    firstCouponDate: {
      type: Date,
      require: true,
    },
    lastCouponDate: {
      type: Date,
      require: true,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Contract = models.Contract || model("Contract", ContractSchema);
