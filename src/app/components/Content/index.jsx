import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import Folder from "../Folder";

import { ContentStyled } from "./styles";
import { DEFAULT_URL } from "../../constants";

/**
 * Функциональный компонент, отвечает за первичную отрисовку файлового дерева
 * первый запрос на сервер происходит при монтировании компонента
 * @returns папку со списком 1 уровня
 */
export const Content = () => {
  const [state, setState] = useState();
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
      <Folder
        id={state.id}
        title={state.title}
        folderChildren={state.children}
        open={isOpen}
      />
    </ContentStyled>
  );
};
