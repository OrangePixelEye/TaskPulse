import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string;
}
