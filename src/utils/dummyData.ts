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
    email: "btech41522014@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "21422026",
    name: "Harshit Tiwari",
    email: "somethingsomething@gmail.com",
    password: "",
  },
  {
    rollNumber: "2021003",
    name: "Rohan Kumar",
    email: "rohan.kumar@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021004",
    name: "Sneha Gupta",
    email: "sneha.gupta@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021005",
    name: "Arjun Singh",
    email: "arjun.singh@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021006",
    name: "Kavya Reddy",
    email: "kavya.reddy@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021007",
    name: "Vikash Yadav",
    email: "vikash.yadav@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021008",
    name: "Ananya Joshi",
    email: "ananya.joshi@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021009",
    name: "Karan Malhotra",
    email: "karan.malhotra@dseu.ac.in",
    password: "",
  },
  {
    rollNumber: "2021010",
    name: "Pooja Agarwal",
    email: "pooja.agarwal@dseu.ac.in",
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
