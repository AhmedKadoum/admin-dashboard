export interface User {
  id: number;
  username: string;
  password: string;//check if this is needed
  role: string;
  name: string;
  profilePictureUrl?: string; // Optional field for user's profile picture URL
  // isEmailVerified?: boolean; // Optional field to indicate if the user's email is verified/later
}

export interface AuthResponse {
  token: string;
  user: User;
}
