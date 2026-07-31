"use client";
import { UserResponse } from "@/utils/getuser";
import React from "react";

type IUserContext = {
  user: UserResponse | null;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useUser deve estar dentro do UserContextProvider");
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResponse | null;
}) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
