import Image from "next/image";
import logo from "/public/logo.svg";
import vercel from "/public/vercel.svg"

const Header = () => {
  return (
    <div className="flex flex-row justify-start flex-nowrap items-center mb-8">
      <div className="flex items-stretch justify-start flex-nowrap flex-col gap-2">
        <Image src={logo} width={128} alt="Logo" />
        {/* <Image src={vercel} width={128} alt="Logo" /> */}
      </div>
      <div className="flex flex-row items-stretch justify-start flex-nowrap gap-2 ml-auto">
        test2
      </div>
    </div>
  );
};

export { Header };
