import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './user.schema';
import { User } from '../../../src/app/auth/model/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersSchema }])],
  controllers: [AuthController],
})
export class AuthModule {}
