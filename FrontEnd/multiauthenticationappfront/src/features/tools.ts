export const compareElements = (
  string1: string,
  string2: string,
  element: string
) => {
  if (string1 === string2) return { isError: false, errorMsg: "" };
  else
    return {
      isError: true,
      errorMsg: `${element} confirmation does not match.`,
    };
};
