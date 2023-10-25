"use client"

import { CardBook, CardQuantity, PokeCardQuantity } from "@/utils/types";
import React, { FC, ReactNode, createContext, useContext, useState } from "react";

interface CardBookContextProps {
  mybook: PokeCardQuantity[] | null
  setMyBook: React.Dispatch<React.SetStateAction<PokeCardQuantity[] | null>>
}

const CardBookContext = createContext<CardBookContextProps | undefined>(undefined)

export const CardBookProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mybook, setMyBook] = useState<PokeCardQuantity[] | null>(null)

  return (
    <CardBookContext.Provider value={{ mybook, setMyBook }}>
      {children}
    </CardBookContext.Provider>
  )
}

export const useCardBook = () => {
  const context = useContext(CardBookContext)

  if (!context) {
    throw new Error('useCardBook must be used within a CardBookProvider')
  }

  return context
}