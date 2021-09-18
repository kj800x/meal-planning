import { FC, useState } from "react";
import { Input } from "../../library/Input";
import { Results } from "./Results";

export const HomePage: FC<{}> = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <Input value={value} onChange={setValue} />
      <Results query={value} />
    </>
  );
};
