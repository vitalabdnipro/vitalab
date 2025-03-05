import Image from "next/image";
import logo from "/public/vitalab.svg";

const Logo = () => {
  return (
    <div className="flex items-center bg-grey-0 px-2.5 pb-6 w-full mb-4">
      <div></div>
      <div style={{ position: "relative", width: "500px", height: "30px" }}>
        <Image
          src={logo}
          alt="VitaLab Logo"
          layout="fill"
          objectFit="contain"
          quality={100}
          // width={187}
          // height={}
        />
      </div>
      {/* <span className="font-semibold ml-2.5">VitaLab Partners</span> */}
    </div>
  );
};

export default Logo;
