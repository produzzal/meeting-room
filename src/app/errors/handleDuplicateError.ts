/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"(^")"/);

  const extracted_msg = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extracted_msg} is already existed`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleDuplicateError;
