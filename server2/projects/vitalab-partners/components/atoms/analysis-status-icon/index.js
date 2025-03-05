const AnalysisStatusIcon = (status, icon, action, link, isDisabled) => {
  return (
    <td className="h-[40px]">
      <div className="flex justify-center w-full print:hidden">
        <button
          onClick={(e) => {
            deleteAnalysis(e, item);
          }}
          disabled={isLoading || data.status !== "NEW"}
        >
          {icon}
        </button>
      </div>
    </td>
  );
};

export default AnalysisStatusIcon;
