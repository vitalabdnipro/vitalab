import AddPartnerModal from "../../organisms/add-partner-modal";

const Actionables = ({ actions, customTrigger }) => {
  if (!actions?.length && !customTrigger) {
    return null;
  }
  return (
    <div>
      {customTrigger ? (
        <div>{customTrigger}</div>
      ) : (
        <button
          onClick={actions[0].onClick}
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
        >
          {actions[0].icon}
          {actions[0].label}
        </button>
      )}
    </div>
  );
};

export default Actionables;
