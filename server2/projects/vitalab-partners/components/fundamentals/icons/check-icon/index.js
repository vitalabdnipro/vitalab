const CheckIcon = ({ size = "16", color = "currentColor", ...attributes }) => {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   width={size}
    //   height={size}
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   stroke="currentColor"
    //   strokeWidth="6"
    //   strokeLinecap="round"
    //   strokeLinejoin="round"
    //   className="sbui-icon "
    // >
    //   <circle cx="12" cy="12" r="10"></circle>
    //   <circle cx="12" cy="12" r="6"></circle>
    //   <circle cx="12" cy="12" r="2"></circle>
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      // className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};

export default CheckIcon;
