export const getInitials = (name) => {
  let abbr = name.trim().split(" ");
  abbr[1] = abbr[1].substr(0, 1) + ".";

  return abbr.join(" ");
};
