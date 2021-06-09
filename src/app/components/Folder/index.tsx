import React, { FC, memo, useState, MouseEvent } from "react";
import axios from "axios";

import { Item } from "../Item";
import {
  FolderStyled,
  ChildrenStyled,
  FolderTitle,
  FolderOpeneSvg,
  FolderCloseSvg,
} from "./styles";
import { DEFAULT_URL } from "../../constants";
import { IListItem } from "../interfaces";

/**
 * Фунциональный компонент для отрисовки папки с вложениями.
 * Обладает рекурсией и внутренним состоянием только для одного уровня вложенности потомков
 * @param {number} id id папки
 * @param {string} title название файла или папки
 * @returns возвращает или файл, или новую версию себя же со списком файлов уровня ниже
 */
const Folder: FC<IListItem> = ({ id, title }) => {
  const [folderList, setFolderList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleInsideFolderClick = (
    env: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    id: string
  ) => {
    env.stopPropagation();
    setIsOpen(!isOpen);
    if (folderList.length > 0) {
      return;
    }

    const url = `${DEFAULT_URL}?dirId=${id}`;
    axios.get(url).then((res) => {
      setFolderList(res.data.children);
    });
  };

  return (
    <FolderStyled onClick={(env) => handleInsideFolderClick(env, id)}>
      <FolderTitle isOpen={isOpen}>
        {isOpen ? <FolderOpeneSvg /> : <FolderCloseSvg />}
        <div>{title}</div>
      </FolderTitle>
      <ChildrenStyled>
        {isOpen && folderList && folderList.length > 0 && (
          <>
            {folderList.map((item) => {
              if (item.title.includes(".")) {
                return <Item key={id} title={item.title} />;
              }

              return (
                <div>
                  <Folder
                    key={item.id}
                    id={item.id}
                    title={item.title}
                  ></Folder>
                </div>
              );
            })}
          </>
        )}
      </ChildrenStyled>
    </FolderStyled>
  );
};

export default memo(Folder);
