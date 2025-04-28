const CalendarIcon = ({ size = "16", color = "currentColor", ...attributes }) => {
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
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};

export default CalendarIcon;
