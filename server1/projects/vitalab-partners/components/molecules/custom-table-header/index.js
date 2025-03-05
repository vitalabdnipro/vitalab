import { capitalize } from "lodash";

const CustomTableHeader = ({ name }) => {
  return (
    <div className="flex text-base leading-6 font-semibold gap-x-base cursor-pointer text-gray-900 print:hidden">
      {capitalize(name)}
    </div>
  );
};

export default CustomTableHeader;
