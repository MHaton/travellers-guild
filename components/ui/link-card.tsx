export default ({
  title,
  href,
  description,
  Icon,
}: {
  title: string;
  href: string;
  description: string;
  Icon: any;
}) => {
  return (
    <a
      href={href}
      className="flex flex-row transition rounded-md items-start not-prose gap-6 unstyled-link no-underline"
    >
      <div className="p-2 bg-white/50 dark:bg-white/10 rounded-md">
        {Icon && <Icon className="w-8 h-8 text-primary-500 dark:text-white" />}
      </div>
      <div className="flex flex-col">
        <p className="text-xl font-bold">{title}</p>
        <p className="font-normal">{description}</p>
      </div>
    </a>
  );
};
