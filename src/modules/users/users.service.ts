import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      _id: '6139e643ffa5f94b5fefae22',
      icNumber: 'A294400',
      firstName: 'Mohamed',
      lastName: 'Fauzaan',
      dob: '08-01-1997',
      company: {
        _id: '6138a385dc0d997f5c54585b',
        name: 'Brio Hiring',
      },
    },
    {
      _id: '6139e643ffa5f94b5fefae21',
      icNumber: 'A294401',
      firstName: 'Nabil',
      lastName: 'Oudghiri',
      dob: '08-01-1991',
      company: {
        _id: '6138a385dc0d997f5c54585c',
        name: 'Brio HR',
      },
    },
  ];

  async getUserDetails({
    userId,
    companyId,
  }: {
    userId: string;
    companyId: string;
  }) {
    const user = this.users.find(
      user => user._id === userId && user.company._id == companyId,
    );

    if (!user) throw new BadRequestException('User not found');

    return user;
  }
}
