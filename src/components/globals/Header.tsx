import React from "react";

type Props = {
  title: string;
  description: string;
};

const Header = ({ title, description }: Props) => {
  return (
    <header className="flex flex-col gap-2">
      <h2 className="font-semibold text-white text-2xl">{title}</h2>
      <p className="text-white text-lg">{description}</p>
    </header>
  );
};

export default Header;
