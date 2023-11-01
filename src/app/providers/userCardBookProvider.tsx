"use client"

import { CardBook, CardQuantity, PokeCardQuantity } from "@/utils/types";
import React, { FC, ReactNode, createContext, useContext, useState } from "react";

interface UserCardBookContextProps {
  mybooks: CardBook[] | null
  setMyBooks: React.Dispatch<React.SetStateAction<CardBook[] | null>>
}

const UserCardBookContext = createContext<UserCardBookContextProps | undefined>(undefined)

export const UserCardBookProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mybooks, setMyBooks] = useState<CardBook[] | null>(null)

  return (
    <UserCardBookContext.Provider value={{ mybooks, setMyBooks }}>
      {children}
    </UserCardBookContext.Provider>
  )
}

export const useMyCardBook = () => {
  const context = useContext(UserCardBookContext)

  if (!context) {
    throw new Error('useCardBook must be used within a CardBookProvider')
  }

  return context
}