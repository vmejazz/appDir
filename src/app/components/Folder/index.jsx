import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { produce } from "immer";

import { Item } from "../Item";
import {
  FolderStyled,
  ChildrenStyled,
  FolderTitle,
  FolderOpeneSvg,
  FolderCloseSvg,
} from "./styles";
import { DEFAULT_URL } from "../../constants";

/**
 * Фунциональный компонент для отрисовки папки с вложениями.
 * Обладает рекурсией и внутренним состоянием только для одного уровня вложенности потомков
 * @param {number} id id папки
 * @param {string} title название файла или папки
 * @param {Array} folderChildren список дочерних вложений
 * @param {boolean} open флаг открыта ли папка
 * @returns возвращает или файл, или новую версию себя же со списком файлов уровня ниже
 */
const Folder = ({ id, title, folderChildren = [], open }) => {
  const [folderList, setFolderList] = useState(folderChildren);
  const [isOpen, setIsOpen] = useState(open);
  const [openId, setOpenId] = useState();

  const handleInsideFolderClick = (env, id) => {
    env.stopPropagation();
    setIsOpen(true);
    setOpenId(id);

    const url = `${DEFAULT_URL}?dirId=${id}`;
    axios.get(url).then((res) => {
      setFolderList(
        produce(folderList, (draft) => {
          const childIndex = folderList.findIndex((item) => item.id === id);
          draft[childIndex].children = res.data.children;
        })
      );
    });
  };

  useEffect(() => {
    if (folderChildren.length > 0) {
      setFolderList(folderChildren);
    }
  }, [folderChildren]);

  useEffect(() => {
    if (open) {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <FolderStyled>
      <FolderTitle isOpen={isOpen}>
        {isOpen ? <FolderOpeneSvg /> : <FolderCloseSvg />}
        <div>{title}</div>
      </FolderTitle>
      <ChildrenStyled>
        {folderList && folderList.length > 0 && (
          <>
            {folderList.map((item) => {
              if (item.title.includes(".")) {
                return <Item key={id} title={item.title} />;
              }

              return (
                <div onClick={(env) => handleInsideFolderClick(env, item.id)}>
                  <Folder
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    folderChildren={item.children}
                    open={openId === item.id}
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
