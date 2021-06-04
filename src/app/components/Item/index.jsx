import React from "react";

import { ItemStyled, FileSvg } from "./styles";

/**
 * Функциональный компонент отображающий файл
 * @param {string} title название файла
 * @returns файл с расширением, последний в цепочке файлового дерева
 */
export const Item = ({ title }) => {
  return (
    <ItemStyled>
      <FileSvg />
      {title}
    </ItemStyled>
  );
};
