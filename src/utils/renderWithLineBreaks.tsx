export const renderWithLineBreaks = (text: string) => {
  return text.split("\n").map((line, index, array) => (
    <span key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </span>
  ));
};
