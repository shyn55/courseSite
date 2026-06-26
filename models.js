import { models, model, Schema, mongoose } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      trim: true,
    },
   email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true, // این باعث می‌شود که اسناد با email: null ایندکس نشوند
    },
    name: {
      type: String,
      trim: true,
      minLength: [3, "نام باید حداقل 3 کاراکتر یا بیشتر باشد"],
      maxLength: 50,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "admin",
    },
    otp: {
      code: {
        type: String,
      },
      expirseAt: {
        type: Date,
      },
    },
    isVerified: {
      type: Boolean,
      dafault: false,
    },
    purcgasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        default: [],
      },
    ],
    lastLoginAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
