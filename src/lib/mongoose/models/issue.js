import mongoose from 'mongoose';

//Issue type
const issueTypeSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true,
    enum: ['regular-edition', 'special-edition'],
    default: 'regular-edition',
  },
  issueTheme: {
    type: String,
    required: function () {
      return this.issueType === 'special-edition';
    },
  },
});

//Issue schema
const issueSchema = new mongoose.Schema(
  {
    issueTitle: { type: String, required: true },
    issueType: {
      type: String,
      required: true,
      enum: ['regular-issue', 'special-issue'],
      default: 'regular-issue',
    },
    issueTheme: {
      type: String,
      required: function () {
        return this.issueType === 'special-issue';
      },
    },
    issueNumber: { type: String, required: true, enum: [1, 2] },
    issueYear: {
      type: Number,
      required: true,
    },
    volume: { type: String, required: true },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], //likely remove
    ref: { type: String, required: true, unique: true },
    // slug: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishDate: { type: Date },
    status: {
      type: String,
      required: true,
      default: 'draft',
      enum: ['draft', 'published'],
    },

    addedBy: { type: String, required: true, trim: true },
    publishedBy: { type: String, required: true, trim: true, default: 'N/A' },
  },
  { timestamps: true }
);

export const Issue =
  mongoose.models?.Issue || mongoose.model('Issue', issueSchema);
