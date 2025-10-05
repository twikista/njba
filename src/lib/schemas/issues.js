import { z } from 'zod';

const articleAuthorSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  department: z.string().optional(),
  institution: z.string().optional(),
});

const fileSizeInMb = (sizeInBytes) => sizeInBytes / 1024 ** 2;
const MAX_FILESIZE = 10;
const fileInputSchema = z
  .custom()
  .refine((files) => Array.from(files ?? []).length !== 0, {
    message: 'Article PDF is required',
  })
  .refine((files) =>
    Array.from(files ?? []).every(
      (file) => +fileSizeInMb(file.size).toFixed(2) <= MAX_FILESIZE,
      {
        message: 'maximum file size is 10MB',
      }
    )
  )
  .refine(
    (files) =>
      Array.from(files ?? []).every((file) => {
        return 'application/pdf' === file?.type;
      }),
    { message: 'File type must be PDF' }
  );

export const articleFormSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  authors: z.array(articleAuthorSchema),
  volume: z
    .string()
    .min(1, 'volume field is required')
    .refine(
      (value) => (typeof Number(value) === 'number', 'issue must be a number')
    ),
  issue: z
    .string()
    .min(1, 'issue field is required')
    .refine(
      (value) => value === '1' || value === '2' || value === 'special-issue',
      'issue number must be 1, 2 or special-issue'
    ),
  startPage: z.number({
    required_error: 'start page number is required',
    invalid_type_error: 'start page must be a number',
  }),
  endPage: z.number({
    required_error: 'end page number is required',
    invalid_type_error: 'end page must be a number',
  }),
  abstract: z.string().min(1, { message: 'Abstract is required' }),
  keywords: z.array(z.string()).refine((keywords) => keywords.length, {
    message: 'Keyword must be provided',
  }),
  jelClassification: z.array(z.string()).optional(),
});

export const newArticleFormSchema = articleFormSchema.extend({
  pdfFile: fileInputSchema,
});

export const articleSchemaForServer = articleFormSchema.extend({
  pdfFile: z
    .union([
      z
        .string()
        .url({ message: 'provide valid url' })
        .startsWith('https://firebasestorage.googleapis.com', {
          message: 'provide valid url',
        })
        .includes('bijed-f265e.appspot.com', { message: 'provide valid' }),
      z.null(),
    ])
    .optional(),
});

export const editArticleFormSchema = articleFormSchema.extend({
  pdfFile: z.union([fileInputSchema, z.null()]).optional(),
});

export const IssueFormSchema = z
  .object({
    issueNumber: z.string().min(1, 'issue number is required'),
    issueYear: z
      .number('issue year must be a number')
      .min(
        new Date().getFullYear() - 20,
        'issue year must be within the last 20 years'
      )
      .max(new Date().getFullYear(), 'issue year cannot be in the future'),
    volume: z
      .string()
      .min(1, 'volume is required')
      .refine(
        (value) => (
          typeof Number(value) === 'number', 'Volume must be a number'
        )
      ),
    issueType: z.enum(['regular-issue', 'special-issue'], {
      required_error: 'issue type is required',
    }),
    issueTheme: z.string().optional(),
    issueMonth: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.issueType === 'regular-issue') {
        return data.issueNumber === '1' || data.issueNumber === '2';
      }
      if (data.issueType === 'special-issue') {
        return data.issueNumber === 'special-issue';
      }
      return true;
    },
    {
      message: 'Invalid issue number for the selected issue type',
      path: ['issueNumber'], // This shows the error on the issueNumber field
    }
  )
  .refine(
    (data) => {
      return data.issueType === 'special-issue' ? !!data.issueMonth : true;
    },
    {
      message: 'issue month is required for special issues',
      path: ['issueMonth'],
    }
  );

export const editorialBoardSchema = z.object({
  content: z
    .string()
    .min(200, { message: 'Content must have minimum of 30 characters' }),
});
