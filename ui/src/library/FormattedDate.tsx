import { FC } from "react";

type DateLike = number | Date;

export const FormattedDate: FC<{
  date: DateLike;
  format: Intl.DateTimeFormatOptions;
}> = ({ date, format }) => {
  const parsedDate = new Date(date);
  return <span>{parsedDate.toLocaleDateString(undefined, format)}</span>;
};
