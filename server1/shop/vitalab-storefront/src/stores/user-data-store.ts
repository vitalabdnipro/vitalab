import { UserData } from "@features/account/register/user-data"
import { atom } from "jotai"

interface UserData {
  lastName: string
  firstName: string
  middleName: string
  birthday: string
  gender: "male" | "female" | ""
  email: string
  phone?: string
  password: string
}

const userDataAtom = atom<UserData>({
  lastName: "",
  firstName: "",
  middleName: "",
  birthday: "",
  gender: "",
  email: "",
  phone: "",
  password: "",
})
const userPhoneAtom = atom({ phone: "" })
const otpAtom = atom<string>("")

export { userDataAtom, userPhoneAtom, otpAtom }
