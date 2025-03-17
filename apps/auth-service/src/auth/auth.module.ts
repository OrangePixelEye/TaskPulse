import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET),

    }),
    TypeOrmModule.forFeature([Auth])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
