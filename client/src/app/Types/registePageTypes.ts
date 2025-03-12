export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    category: string;
    mobile: string;
    education: string;
    description: string;
    interests: string;
    departMent: string;
    profilePic: string;
    [key: string]: string;
  }