import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { UsersService } from '../../services/users.service';
import { LoginDto } from '../../dto/login.dto';

describe('LoginController', () => {
  let controller: LoginController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call userService.login with the correct data', async () => {
    const loginDto: LoginDto = {
      email: 'testuser',
      password: 'testpassword',
    };

    // Define el resultado esperado cuando userService.login se llama con loginDto
    const expectedResult = {
      user: 'testuser',
      token: 'token',
    };

    // Configura el mock de userService.login para devolver el resultado esperado
    (usersService.login as jest.Mock).mockReturnValue(expectedResult);

    const result = await controller.login(loginDto);

    expect(result).toEqual(expectedResult);
    expect(usersService.login).toHaveBeenCalledWith(loginDto);
  });
});
