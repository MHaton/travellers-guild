export const IFrame = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
  return (
    <iframe
      allowFullScreen={true}
      scrolling="no"
      allow="encrypted-media *;"
      src={src}
      className={className}
    />
  );
};
