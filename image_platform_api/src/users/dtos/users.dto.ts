export class CreateUserDto {
  username: string;
  password: string;
}

export class UpdateUserDto {
  id: number;
  username?: string;
  password?: string;
}
