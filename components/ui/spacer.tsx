type SpacerSize = "xs" | "sm" | "base" | "lg" | "xl";

export const getHeight = (size: SpacerSize) => {
  switch (size) {
    case "xs":
      return "0.5rem";
    case "sm":
      return "1rem";
    case "lg":
      return "4rem";
    case "xl":
      return "8rem";
    default:
      return "2rem";
  }
};

export default ({ size = "base" }: { size?: SpacerSize }) => {
  return <div style={{ height: getHeight(size) }} />;
};
