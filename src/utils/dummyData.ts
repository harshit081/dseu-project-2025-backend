export interface User {
  rollNumber: string;
  name: string;
  email: string;
  password: string;
  otp?: string;
  otpExpiresAt?: number;
}

export const dummyUsers: User[] = [
  {
    rollNumber: "41522014",
    name: "Anupam",
    email: "9582anupamk@gmail.com",
    password: "",
  },
  {
    rollNumber: "41522026",
    name: "Harshit Tiwari",
    email: "tharshit0812@gmail.com",
    password: "",
  }
];

export default dummyUsers;
