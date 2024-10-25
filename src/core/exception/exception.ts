import { HttpStatus } from '@nestjs/common';

export const EXCEPTION = {
  // DEFUALT DATABASE
  RECORD_NOT_FOUND: {
    message: {
      en: 'Record Not Found.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'not_found',
  },

  // DEFAULT AUTH
  UNAUTHORIZED: {
    message: {
      en: 'Unauthorized.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'Unauthorized',
  },
  YOU_NOT_PERMISSIONS: {
    message: {
      en: 'You are not permissions.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'permission_deny',
  },
  TOKEN_EXPIRED: {
    message: {
      en: 'Token Expired.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'token_expired',
  },
  USER_BLOCK: {
    message: {
      en: 'User Blocked.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'user_blocked',
  },
  BAD_TOKEN: {
    message: {
      en: 'Bad Token.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'bad_token',
  },

  // DEFUALT ROUTER
  SORRY_SOMETHING_WENT_WRONG: {
    message: {
      en: 'Sorry! Something went wrong.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'something_went_wrong',
  },
  THE_API_NOT_SUPPORTED: {
    message: {
      en: 'The API is not supported.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'api_not_supported',
  },
  BAD_REQUEST: {
    message: {
      en: 'Bad Request.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'bad_request',
  },

  // USER
  USER_CREATED: {
    message: {
      en: 'User registered successfully',
    },
    httpCode: HttpStatus.CREATED,
    statusCode: HttpStatus.CREATED,
    type: 'user_created',
  },

  USER_CHANGEPASSWORD: {
    message: {
      en: 'User change successfully',
    },
    httpCode: HttpStatus.OK,
    statusCode: HttpStatus.OK,
    type: 'user_change_password',
  },
  USERNAME_ALREADY_REGISTERED: {
    message: {
      en: 'Username already registered.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'username_registered',
  },
  ACCOUNT_HAS_BEEN_DELETED: {
    message: {
      en: 'This account has been deleted. Check back with your manager.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'accout_not_existed',
  },
  ACCOUNT_HAS_BEEN_BLOCKED: {
    message: {
      en: 'This account has been blocked.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'user_blocked',
  },
  ACCOUNT_DOES_NOT_EXIST: {
    message: {
      en: 'Account does not exist.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'accout_not_existed',
  },
  PASSWORD_ALREADY_EXISTS: {
    message: {
      en: 'Please enter a new password that is different from the old password.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_already_exists',
  },
  PASSWORD_IS_NOT_CORRECT: {
    message: {
      en: 'Current password is not correct.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_correct',
  },
  EMAIL_DOSE_NOT_EXIST: {
    message: {
      en: 'Email dose not exist.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'Email_dose_not_exist',
  },
  PHONE_NUMBER_ALREADY_EXIST: {
    message: {
      en: 'Phone number already exist.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_number_already_exists',
  },
  EMAIL_OR_PASSWORD_IS_INCORRECT: {
    message: {
      en: 'Email or password is incorrect.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'email_or_password_is_incorrect',
  },
  EMAIL_ALREADY_REGISTERED: {
    message: {
      en: 'Email already registered.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'email_registered',
  },
  NAME_ALREADY_REGISTERED: {
    message: {
      en: 'Name already registered.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'name_register',
  },
  PHONE_ALREADY_REGISTERED: {
    message: {
      en: 'Phone already registered',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_registered',
  },
  DELETE_ACCOUNT: {
    message: {
      en: 'Account has been deleted.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'delete_account',
  },

  // EMPLOYEE
  ADMIN_EMAIL_DOSE_NOT_EXIST: {
    message: {
      en: 'Email dose not exist.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'Email_dose_not_exist',
  },

  ADMIN_PASSWORD_IS_NOT_CORRECT: {
    message: {
      en: 'Current password is not correct.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_correct',
  },

  LEAST_ONE_EXISTED_VOICE: {
    message: {
      en: 'Least one existed voice.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'least_on_existed_voice',
  },
  USER_NOT_FOUND: {
    message: {
      en: 'User not found.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'user_not_found',
  },

  NAME_CLUB_ALREADY_REGISTERED: {
    message: {
      en: 'Name already registered.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'name_registered',
  },

  MEMBER_CLUB_ALREADY_JOINED: {
    message: {
      en: 'Member already joined.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'member_joined',
  },

  MEMBER_NOT_FOUND: {
    message: {
      en: 'Member not found.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'member_not_found',
  },
  PHONE_BEING_APPRAISAL: {
    message: {
      en: 'Phone number is being verified.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_number_is_being_appraisal',
  },
  PASSWORD_IS_NOT_SAME: {
    message: {
      en: 'Password is not same.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_same',
  },

  ACCOUNT_NOT_YET_REGISTERED: {
    message: {
      en: 'Account not yet registered.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'account_not_yet_registered',
  },
};
