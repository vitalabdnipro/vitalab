import React, { useState } from "react"

import { RegistrationCard } from "../components/registration-card"
import { PhoneConfirmationForm } from "./phone-confirmation-form"
import { TermsOfService } from "./terms-of-service"
import { RegistrationForm } from "./user-data"
import { UserPhone } from "./user-phone"

const Registration = () => {
  const [step, setStep] = useState(0)

  const nextStep = () => setStep((currentStep: number) => currentStep + 1)
  const prevStep = () => setStep((currentStep: number) => currentStep - 1)

  console.log(step)
  return (
    <RegistrationCard>
      {step === 0 && <RegistrationForm step={step} nextStep={nextStep} />}
      {step === 1 && <UserPhone step={step} nextStep={nextStep} />}
      {step === 2 && <PhoneConfirmationForm step={step} nextStep={nextStep} />}
      {step === 3 && <TermsOfService step={step} nextStep={nextStep} />}
    </RegistrationCard>
  )
}

export { Registration }
