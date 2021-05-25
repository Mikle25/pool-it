const breakpoints = {
  xl: 1400,
  lg: 1024,
  md: 768,
  sm: 576,
};

export default {
  xlUp: `min-width: ${breakpoints.xl}px`,
  xlDown: `max-width: ${breakpoints.xl - 1}px`,
  lgDown: `max-width: ${breakpoints.lg - 1}px`,
  mdDown: `max-width: ${breakpoints.md - 1}px`,
  smDown: `max-width: ${breakpoints.sm - 1}px`,
};
