import React, { useState } from "react"

// import { RegistrationCard } from "../components/registration-card"
import { RegistrationForm } from "./components"
import { PhoneConfirmationForm } from "./components/phone-confirmation-form"
// import { UserData } from "./user-data"
// import { UserPhone } from "./user-phone"

const Registration = () => {
  const [step, setStep] = useState(0)

  const nextStep = () => setStep((currentStep: number) => currentStep + 1)
  const prevStep = () => setStep((currentStep: number) => currentStep - 1)

  return (
    <>
      {step === 0 && <RegistrationForm step={step} nextStep={nextStep} />}
      {step === 1 && <PhoneConfirmationForm step={step} nextStep={nextStep} />}
      {/* {step === 2 && <PhoneConfirmationForm step={step} nextStep={nextStep} />} */}
    </>
  )
}

export { Registration }
