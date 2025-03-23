export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export type SignupFormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email: string;
  password: string;
};
