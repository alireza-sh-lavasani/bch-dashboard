import { Schema, model, models, Types } from "mongoose";

const IssueSchema = new Schema(
  {
    isin: {
      type: String,
      required: true,
      default: 'XXX'
    },
    cfi: {
      type: String,
      required: true,
      default: 'XXX'
    },
    fisn: {
      type: String,
      required: true,
      default: 'XXX'
    },
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    issuePrice: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      max: [100, "value must be in range of 0 - 100"],
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
    minInvestmentSize: {
      type: Number,
      min: [0, "value must be greater than 0"],
      required: true,
    },
    centralSecuritiesDepository: {
      type: String,
      enum: ["Clearstream", "Euroclear", "SIX"],
      required: true,
    },
    maturityDate: {
      type: Date,
      required: true,
    },
    redemptionPrice: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      max: [100, "value must be in range of 0 - 100"],
    },
    redemption: {
      type: String,
      enum: ["UNDER_PAR", "AT_PAR"],
    },
    interestType: {
      type: String,
      enum: ["FIXED_RATE", "VARIABLE_RATE", "ZERO_COUPON", "OTHER"],
      required: true,
    },
    interestRate: {
      type: Number,
      min: [0, "value must be in range of 0 - 100"],
      max: [100, "value must be in range of 0 - 100"],
      required: true,
    },
    dayCountFraction: {
      type: String,
      enum: ["30/360", "ACT/ACT"],
    },
    interestPaymentFrequency: {
      type: String,
      enum: ["WEEKLY", "MONTHLY", "QUARTERLY", "SEMI_ANNUALLY", "YEARLY", "OTHER"],
      required: true,
    },
    couponDates: {
      type: String,
      enum: ["ADJUSTED", "UNADJUSTED"],
    },
    firstCouponDate: {
      type: Date,
    },
    lastCouponDate: {
      type: Date,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Issue = models.Issue || model("Issue", IssueSchema);
