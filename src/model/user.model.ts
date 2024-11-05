import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the IUser interface extending Document
export interface IUser extends Document {
    username: string;
    password: string; // Ensure this matches the schema field
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Corrected property name
});

// Method to hash password
UserSchema.methods.hashPassword = async function (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    this.password = hashedPassword; // Use this.password to set the hashed password
    return hashedPassword;
};

// Method to validate password
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password); // Ensure this references this.password
};

// Export the User model
export default mongoose.model<IUser>('User', UserSchema);
