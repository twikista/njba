import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    authors: [
      {
        name: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
      },
    ],
    volume: { type: String, required: true, trim: true },
    issue: { type: String, required: true, trim: true, enum: [1, 2] },
    publishDate: { type: Date },
    startPage: { type: Number, required: true },
    endPage: { type: Number, required: true },
    abstract: { type: String, required: true },
    pdfUrl: { type: String, required: true, unique: true },
    keywords: [{ type: String, required: true }],
    jelClassification: [{ type: String, required: false }],
    slug: { type: String, required: true },
    ref: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    articleViews: { type: Number, default: 0 },
    abstractViews: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    // addedBy:{ type: String, required: true},
    // approvedBy:{ type: String, required: true},
  },
  { timestamps: true }
);

export const Article =
  mongoose.models?.Article || mongoose.model('Article', articleSchema);
