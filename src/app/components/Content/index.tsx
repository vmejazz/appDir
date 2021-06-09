import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import Folder from "../Folder";

import { ContentStyled } from "./styles";
import { DEFAULT_URL } from "../../constants";
import { ITreeItem } from "../interfaces";
import {
  ChildrenStyled,
  FolderCloseSvg,
  FolderOpeneSvg,
  FolderTitle,
} from "../Folder/styles";

/**
 * Функциональный компонент, отвечает за первичную отрисовку файлового дерева
 * первый запрос на сервер происходит при монтировании компонента
 * @returns папку со списком 1 уровня
 */
export const Content: FC = () => {
  const [state, setState] = useState<ITreeItem>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get(DEFAULT_URL).then((res) => {
      setState(res.data);
    });
    setIsOpen(!isOpen);
  }, []);

  if (!state) {
    return null;
  }

  return (
    <ContentStyled>
      <FolderTitle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FolderOpeneSvg /> : <FolderCloseSvg />}
        <div>{state.title}</div>
      </FolderTitle>
      {isOpen && (
        <ChildrenStyled>
          {state.children.length > 0 &&
            state.children.map((item) => {
              return <Folder key={item.id} id={item.id} title={item.title} />;
            })}
        </ChildrenStyled>
      )}
    </ContentStyled>
  );
};
