"use client"

import React, { FC, ReactNode, createContext, useContext, useState } from "react";

interface SubscriptionProps {
  isPremium: boolean | null,
  setIsPremium: React.Dispatch<React.SetStateAction<boolean | null>>,
}

const SubscriptionContext = createContext<SubscriptionProps | undefined>(undefined)

export const SubscriptionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState<boolean | null>(null)

  return (
    <SubscriptionContext.Provider value={{ isPremium, setIsPremium }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)

  if (!context) {
    throw new Error('useSubscriptrion must be used within a SubscriptrionProvider')
  }

  return context
}