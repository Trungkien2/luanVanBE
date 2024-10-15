import { HttpStatus } from '@nestjs/common';

export const EXCEPTION = {

  // DEFUALT DATABASE
  RECORD_NOT_FOUND: {
    message: {
      en: 'Record Not Found.',
      // ko: '해당 기록이 없습니다.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'not_found',
  },

  // DEFAULT AUTH
  UNAUTHORIZED: {
    message: {
      en: 'Unauthorized.',
      // ko: '허가받지 않은.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'Unauthorized',
  },
  YOU_NOT_PERMISSIONS: {
    message: {
      en: 'You are not permissions.',
      // ko: '접근 권한이 없습니다.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'permission_deny',
  },
  TOKEN_EXPIRED: {
    message: {
      en: 'Token Expired.',
      // ko: '토큰이 만료되었습니다.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'token_expired',
  },
  USER_BLOCK: {
    message: {
      en: 'User Blocked.',
      // ko: '본 계정이 차단되었습니다. teamscare123@gmail.com 으로 관리자와 연락해주시기 바랍니다.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'user_blocked',
  },
  BAD_TOKEN: {
    message: {
      en: 'Bad Token.',
      // ko: '나쁜 토큰.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'bad_token',
  },

  // DEFUALT ROUTER
  SORRY_SOMETHING_WENT_WRONG: {
    message: {
      en: 'Sorry! Something went wrong.',
      // ko: '에러. 문제가 발생했습니다.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'something_went_wrong',
  },
  THE_API_NOT_SUPPORTED: {
    message: {
      en: 'The API is not supported.',
      // ko: 'API 지원하지 않습니다.',
    },
    httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    type: 'api_not_supported',
  },
  BAD_REQUEST: {
    message: {
      en: 'Bad Request.',
      // ko: '잘못된 요청입니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'bad_request',
  },

  // USER
  USER_CREATED :{
    message: {
      en: 'User registered successfully',
    
    },
    httpCode: HttpStatus.CREATED,
    statusCode: HttpStatus.CREATED,
    type: 'user_created',
  },
  USERNAME_ALREADY_REGISTERED: {
    message: {
      en: 'Username already registered.',
      // ko: '이미 가입된 이메일입니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'username_registered',
  },
  ACCOUNT_HAS_BEEN_DELETED: {
    message: {
      en: 'This account has been deleted. Check back with your manager.',
      // ko: '본 계정이 삭제되었습니다. 관리자와 다시 확인하세요.',
    },
    httpCode: HttpStatus.UNAUTHORIZED,
    statusCode: HttpStatus.UNAUTHORIZED,
    type: 'accout_not_existed',
  },
  ACCOUNT_HAS_BEEN_BLOCKED: {
    message: {
      en: 'This account has been blocked.',
      // ko: '이 계정이 차단되었습니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'user_blocked',
  },
  ACCOUNT_DOES_NOT_EXIST: {
    message: {
      en: 'Account does not exist.',
      // ko: '회원 정보가 없습니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'accout_not_existed',
  },
  PASSWORD_ALREADY_EXISTS: {
    message: {
      en: 'Please enter a new password that is different from the old password.',
      // ko: '이전 비밀번호와 다른 새 비밀번호를 입력하세요.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_already_exists',
  },
  PASSWORD_IS_NOT_CORRECT: {
    message: {
      en: 'Current password is not correct.',
      // ko: '비밀번호를 틀렸습니다. 다시 입력해 주세요.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_correct',
  },
  EMAIL_DOSE_NOT_EXIST: {
    message: {
      en: 'Email dose not exist.',
      // ko: '이메일 용량이 존재하지 않습니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'Email_dose_not_exist',
  },
  PHONE_NUMBER_ALREADY_EXIST: {
    message: {
      en: 'Phone number already exist.',
      // ko: '전화번호가 이미 존재합니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_number_already_exists',
  },
  EMAIL_OR_PASSWORD_IS_INCORRECT: {
    message: {
      en: 'Email or password is incorrect.',
      // ko: '이메일 또는 비밀번호가 올바르지 않습니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'email_or_password_is_incorrect',
  },
  EMAIL_ALREADY_REGISTERED: {
    message: {
      en: 'Email already registered.',
      // ko: '이미 등록된 이메일.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'email_registered',
  },
  NAME_ALREADY_REGISTERED: {
    message: {
      en: 'Name already registered.',
      // ko: '이미 등록된 이메일.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'name_register',
  },
  PHONE_ALREADY_REGISTERED: {
    message: {
      en: 'Phone already registered',
      // ko: '이미 등록된 이메일.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_registered',
  },
  DELETE_ACCOUNT: {
    message: {
      en: 'Account has been deleted.',
      // ko: '계정이 삭제되었습니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'delete_account',
  },



  // EMPLOYEE
  ADMIN_EMAIL_DOSE_NOT_EXIST: {
    message: {
      en: 'Email dose not exist.',
      // ko: '입력하신 정보와 일치하는 계정이 없습니다. 관리자에게 문의해 주세요.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'Email_dose_not_exist',
  },

  ADMIN_PASSWORD_IS_NOT_CORRECT: {
    message: {
      en: 'Current password is not correct.',
      // ko: '비밀번호를 틀렸습니다. 다시 입력해 주세요.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_correct',
  },

  LEAST_ONE_EXISTED_VOICE: {
    message: {
      en: 'Least one existed voice.',
      // ko: '최소한 하나의 존재하는 목소리.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'least_on_existed_voice',
  },
  USER_NOT_FOUND: {
    message: {
      en: 'User not found.',
      // ko: '사용자를 찾을 수 없음.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'user_not_found',
  },

  NAME_CLUB_ALREADY_REGISTERED: {
    message: {
      en: 'Name already registered.',
      // ko: '이미 등록된 이름입니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'name_registered',
  },

  MEMBER_CLUB_ALREADY_JOINED: {
    message: {
      en: 'Member already joined.',
      // ko: '이미 가입한 회원.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'member_joined',
  },

  MEMBER_NOT_FOUND: {
    message: {
      en: 'Member not found.',
      // ko: '이미 가입한 회원.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'member_not_found',
  },
  PHONE_BEING_APPRAISAL: {
    message: {
      en: 'Phone number is being verified.',
      // ko: '전화번호가 이미 존재합니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'phone_number_is_being_appraisal',
  },
  PASSWORD_IS_NOT_SAME: {
    message: {
      en: 'Password is not same.',
      // ko: '비밀번호가 다릅니다.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'password_is_not_same',
  },

  ACCOUNT_NOT_YET_REGISTERED: {
    message: {
      en: 'Account not yet registered.',
      // ko: '아직 가입되지 않은 계정.',
    },
    httpCode: HttpStatus.BAD_REQUEST,
    statusCode: HttpStatus.BAD_REQUEST,
    type: 'account_not_yet_registered',
  },
};
