import React from "react"

const RegistrationCard: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="flex w-full flex-col items-center">
      {props.children}
    </div>
  )
}

export { RegistrationCard }
