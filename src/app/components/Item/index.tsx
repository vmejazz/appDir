import React, { FC } from "react";
import { IItem } from "../interfaces";

import { ItemStyled, FileSvg } from "./styles";

/**
 * Функциональный компонент отображающий файл
 * @param {string} title название файла
 * @returns файл с расширением, последний в цепочке файлового дерева
 */
export const Item: FC<IItem> = ({ title }) => {
  return (
    <ItemStyled onClick={(env) => env.stopPropagation()}>
      <FileSvg />
      {title}
    </ItemStyled>
  );
};
