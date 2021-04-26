const ellipsis = (string, start = 7, end = -4) => {
  if (!string) return '';
  return `${string.substr(0, start)}...${string.substr(end)}`;
};

export default ellipsis;
