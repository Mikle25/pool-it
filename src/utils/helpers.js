const ellipsis = (string, start = 7, end = -4) => {
  if (!string) return '';
  return `${string.substr(0, start)}...${string.substr(end)}`;
};

const randomColor = () => {
  return `#${`${Math.random().toString(16)}000000`.substring(2, 8)}`;
};

export { ellipsis, randomColor };
