// users.controller.spec.ts
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockMicroserviceClientService = {
    call: jest.fn(),
  };

  beforeEach(() => {
    usersController = new UsersController(mockMicroserviceClientService as any);
  });

  it('should return user and users', async () => {
    // Arrange
    const fakeUser = { id: 1, name: 'John Doe' };
    const fakeUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];

    // Configure the mock to return the expected data
    mockMicroserviceClientService.call
      .mockResolvedValueOnce({ data: fakeUsers })
      .mockResolvedValueOnce({ data: fakeUser });

    // Act
    const result = await usersController.findAll({} as any, 1).toPromise();

    // Assert
    expect(mockMicroserviceClientService.call).toHaveBeenCalledTimes(2);
    expect(mockMicroserviceClientService.call).toHaveBeenCalledWith(
      expect.anything(),
      '/users',
      'GET',
      expect.anything(),
    );
    expect(mockMicroserviceClientService.call).toHaveBeenCalledWith(
      expect.anything(),
      '/users/1',
      'GET',
      expect.anything(),
    );
  });
});
