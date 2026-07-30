type AuthResponse = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  token: string;
};
