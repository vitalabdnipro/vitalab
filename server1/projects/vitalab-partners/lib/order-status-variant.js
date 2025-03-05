export const getOrderStatusVariant = (title) => {
  switch (title) {
    case "NEW":
      return "Новий";
    case "SENT":
      return "Відправлений";
    case "COMPLETED":
      return "Виконаний";
    default:
      return "Undefined";
  }
};

export const getAnalysisStatusVariant = (title) => {
  switch (title) {
    case "NEW":
      return "Новий";
    case "SENT":
      return "Обробляється";
    case "COMPLETED":
      return "Виконано";
    default:
      return "Undefined";
  }
};
