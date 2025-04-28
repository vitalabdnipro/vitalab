import React, { useState } from "react"

import { RegistrationForm } from "./components"
import { PhoneConfirmationForm } from "./components/phone-confirmation-form"

const Registration = () => {
  const [step, setStep] = useState(0)

  const nextStep = () => setStep((currentStep: number) => currentStep + 1)
  const prevStep = () => setStep((currentStep: number) => currentStep - 1)

  return (
    <>
      {step === 0 && <RegistrationForm step={step} nextStep={nextStep} />}
      {step === 1 && <PhoneConfirmationForm step={step} nextStep={nextStep} />}
    </>
  )
}

export { Registration }
