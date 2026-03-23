import { UserRole } from '@database/model/User';
import { UserRepo } from '@database/repository/UserRepo';
import { RecipientRepo } from '@database/repository/RecipientRepo';
import { HospitalRepo } from '@database/repository/HospitalRepo';
import { JWT } from '@core/JWT';
import { ApiError } from '@core/ApiError';

interface RegisterRecipientData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
}

interface RegisterHospitalData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  hospitalName: string;
  hospitalLicense: string;
  address?: string;
}

interface AuthResponse {
  user: any;
  token: string;
}

export class AuthService {
  static async registerRecipient(data: RegisterRecipientData): Promise<AuthResponse> {
    const existingUser = await UserRepo.findByEmail(data.email);
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    const user = await UserRepo.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: UserRole.RECIPIENT
    });

    // Create recipient profile
    await RecipientRepo.create({
      userId: user._id,
      location: data.location
    });

    const token = JWT.generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: [user.role]
    });

    return {
      user: user.toJSON(),
      token
    };
  }

  static async registerHospital(data: RegisterHospitalData): Promise<AuthResponse> {
    const existingUser = await UserRepo.findByEmail(data.email);
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    const user = await UserRepo.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: UserRole.HOSPITAL
    });

    // Create hospital profile
    await HospitalRepo.create({
      userId: user._id,
      hospitalName: data.hospitalName,
      hospitalLicense: data.hospitalLicense,
      address: data.address || ''
    });

    const token = JWT.generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: [user.role]
    });

    return {
      user: user.toJSON(),
      token
    };
  }

  static async registerAdmin(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<AuthResponse> {
    const existingUser = await UserRepo.findByEmail(data.email);
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    const user = await UserRepo.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: UserRole.ADMIN
    });

    const token = JWT.generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: [user.role]
    });

    return {
      user: user.toJSON(),
      token
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const user = await UserRepo.findByEmailWithPassword(email);

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = JWT.generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: [user.role]
    });

    return {
      user: user.toJSON(),
      token
    };
  }

  static async getCurrentUser(userId: string): Promise<any> {
    const user = await UserRepo.findById(userId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return user.toJSON();
  }
}
