import { Schema, model, Document } from "mongoose";
import { LeadStatus } from "../../@lead-management/core-domain/lead/domain/lead.enum";
export interface LeadDocument extends Document {
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: Object.values(LeadStatus),
      default: LeadStatus.New,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const LeadModel = model<LeadDocument>("Lead", leadSchema);
