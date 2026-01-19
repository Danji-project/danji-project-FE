export const makeDongRange = (text: string) => {
  // 101동 ~ 123동
  const startRange = Number(text.split("동")[0]);
  const lastRange = Number(text.split("동")[1].split(" ")[2]);
  const someArray = [];

  for (let i = startRange; i <= lastRange; i++) {
    someArray.push(i);
  }

  return someArray;
};
