import React from "react";
import Tooltip from "../../atoms/tooltip";
import InfoIcon from "../../fundamentals/icons/info-icon";

const IconTooltip = ({ type = "info", size = 16, content, ...props }) => {
  const icon = (type) => {
    switch (type) {
    //   case "warning":
    //     return <AlertIcon size={size} className="flex text-orange-40" />;
    //   case "error":
    //     return <XCircleIcon size={size} className="flex text-rose-40" />;    
      default:
        return <InfoIcon size={size} className="flex text-gray-400" />;
    }
  };

  return (
    <Tooltip content={content} {...props}>
      {icon(type)}
    </Tooltip>
  );
};

export default IconTooltip;
