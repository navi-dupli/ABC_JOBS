import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserManagerModule } from '../../commons/modules/user-manager/user-manager.module';
import { LoginController } from './controllers/login/login.controller';
import { Auth0LoginService } from './services/auth0-login/auth0-login.service';
import { HttpModule } from '@nestjs/axios';
import { CandidateController } from './controllers/candidate/candidate.controller';
import { CandidateService } from './services/candidate/candidate.service';
import { UserLocation } from '../userLocation/entities/userLocation.entity';
import { Education } from '../education/entities/education.entity';
import { Experience } from '../experience/entities/experience.entity';
import { UserLanguage } from '../userLanguage/entities/userLanguage.entity';
import { UserAbility } from '../userAbility/entities/userAbility.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserLocation, Education, Experience, UserLanguage, UserAbility]),
    UserManagerModule,
    HttpModule,
  ],
  controllers: [UsersController, LoginController, CandidateController],
  providers: [UsersService, Auth0LoginService, CandidateService],
})
export class UsersModule {}
