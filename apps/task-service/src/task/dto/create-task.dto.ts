import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string
}
