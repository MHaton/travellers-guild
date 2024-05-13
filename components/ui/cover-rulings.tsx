export default ({
  children,
  cardLink,
  coverToColour,
  coverFromColour,
}: {
  children: React.ReactNode;
  cardLink: string;
  coverToColour: string;
  coverFromColour: string;
}) => (
  <div
    className={`relative flex flex-col rounded-md bg-gradient-to-br ${coverFromColour} ${coverToColour} p-6 not-prose text-white justify-start items-start overflow-hidden mb-4`}
  >
    {cardLink ? (
      <a
        href={cardLink}
        className="w-full h-full cursor-pointer focus:outline-none focus:ring focus:border-blue-300 no-underline text-white"
        style={{ borderBottom: "none" }}
      >
        {children}
        <div className="absolute top-0 right-0 h-full flex items-center pl-5 pr-5">
          <span className="text-4xl">›</span>
        </div>
      </a>
    ) : (
      <div>{children}</div>
    )}
  </div>
);
