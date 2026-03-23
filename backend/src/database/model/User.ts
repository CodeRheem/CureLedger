import { Schema, model, Document, Types } from 'mongoose';
import bcryptjs from 'bcryptjs';
import { UserRole } from './Role';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isPasswordValid(password: string): Promise<boolean>;
  toJSON(): any;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.DONOR,
      required: true
    },
    verified: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Method to validate password
userSchema.methods.isPasswordValid = async function (password: string): Promise<boolean> {
  return bcryptjs.compare(password, this.password);
};

// Method to return sanitized user object (without sensitive data)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default model<IUser>('User', userSchema);
