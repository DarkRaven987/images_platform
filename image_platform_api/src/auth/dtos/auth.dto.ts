export class checkUsernameDto {
  username: string;
}

export class AuthDto {
  username: string;
  password: string;
}

export class ValidateDto {
  jwt: string;
}

export class ValidateServiceDto {
  id?: number;
  jwt: string;
  keyName: string;
}
