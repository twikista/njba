import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function formatDate(date) {
  // Ensure the input is a Date object
  const dateObj = date instanceof Date ? date : new Date(date);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date input');
  }

  // Get year, month, and day
  const year = dateObj.getFullYear();

  // getMonth() returns 0-11, so add 1 to get 1-12
  // padStart ensures two digits with leading zero if needed
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');

  // getDate() returns the day of the month (1-31)
  // padStart ensures two digits with leading zero if needed
  const day = String(dateObj.getDate()).padStart(2, '0');

  // Return in YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

export const joinKeywords = (arr) => {
  return arr.join(', ');
};

export const articleFileName = (articleObject) =>
  `njba-vol-${articleObject.volume}(${articleObject.issue})-pg${articleObject.startPage}-${articleObject.endPage}.pdf`;

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export const signJWT = (payload, option = { expiresIn: '1d' }) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const signedToken = jwt.sign(payload, secretKey, option);
  return signedToken;
};

export const verifyJWT = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const verifiedToken = jwt.verify(token, secretKey);
    return { ...verifiedToken, expired: false };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true };
    }
    throw error;
  }
};

export const handleServerSideValidationError = (parsedData) => {
  const validationError = Object.fromEntries(
    parsedData.error?.issues?.map((issue) => [issue.path[0], issue.message]) ||
      []
  );
  return validationError;
};

export const handleValidationErrorFromServer = (
  response,
  formFields,
  setError
) => {
  const fieldWithError = Object.keys(formFields).find(
    (field) => response?.error[field]
  );
  if (fieldWithError) {
    // Use the ValidFieldNames type to ensure the correct field names
    const errors = Object.keys(response.error);
    errors.forEach((error) =>
      setError(error, { type: 'server', message: response.error[error] })
    );
  }
};

export const replaceSpaceInTitleWithHyphen = (string) => {
  const titleWithoutColon = string.replace(/[:,]/g, '');
  const titleWithHyphen = titleWithoutColon.replace(/ /g, '-');
  return titleWithHyphen.toLowerCase();
};

export const dateHelperFunction = (date, variant = 'short') => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: `${variant}`,
    day: 'numeric',
  });
};

export const authorsNameWithAbrreviations = (name, reverse = true) => {
  const splitName = name.split(' ');
  const firstName = splitName[0];
  const arrayWithNameInitials = splitName.map((name, index) =>
    index === 0
      ? null
      : index !== splitName.length - 1
        ? `${name[0]?.toUpperCase()}. `
        : `${name[0]?.toUpperCase()}.`
  );
  return reverse
    ? `${arrayWithNameInitials.join(' ')} ${firstName}`
    : `${firstName} ${arrayWithNameInitials.join(' ')}`;
};

// index === 0
//       ? `${name} `
//       : index !== splitName.length - 1
//       ? `${name[0]?.toUpperCase()}. `
//       : `${name[0]?.toUpperCase()}.`

const formatAuthorsForAPAReferencing = (authors) => {
  if (!Array.isArray(authors) || authors.length === 0) return '';

  // Format each author's name
  const formattedAuthors = authors
    .map(({ name }) => {
      if (!name) return ''; // Skip if no name is provided

      const parts = name.trim().split(' ');
      const lastName = parts[0]; // Extract last name
      const otherNames = parts.slice(1); // Extract other names
      const initials = otherNames
        .map((n) => n.charAt(0).toUpperCase() + '.')
        .join(' '); // Convert first/middle names to initials
      console.log('initials', initials);

      return `${lastName}, ${initials}`;
    })
    .filter(Boolean); // Remove empty values (if any)

  // Join authors with correct APA formatting
  if (formattedAuthors.length === 1) return formattedAuthors[0];
  if (formattedAuthors.length === 2) return formattedAuthors.join(' & ');
  return (
    formattedAuthors.slice(0, -1).join(', ') +
    ', & ' +
    formattedAuthors.slice(-1)
  );
};

// Function to generate APA 7 reference with italic journal name
export const generateAPAReference = (article, issue) => {
  if (!article || !issue) return 'Incomplete reference data.';

  const { volume, issue: articleIssue, slug: pages, authors, title } = article;

  const { issueYear: year } = issue;

  if (!authors || !year || !title) return 'Incomplete reference data.';

  const formattedAuthors = formatAuthorsForAPAReferencing(authors);

  return {
    markup:
      `${formattedAuthors} (${year}). ${title}. <i>Nigeria Journal of Business Administration</i>, <i>${volume}</i>(${articleIssue}), ${pages}.`.trim(),
    text: `${formattedAuthors} (${year}). ${title}. Nigeria Journal of Business Administration, ${volume}(${articleIssue}), ${pages}.`.trim(),
  };
};
