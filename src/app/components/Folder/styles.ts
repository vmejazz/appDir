import styled from "styled-components";
import { IFolderTitle } from "../interfaces";
import FolderClose from "./folder-close.svg";
import FolderOpen from "./folder-open.svg";

export const FolderStyled = styled.div`
  user-select: none; 
`;

export const ChildrenStyled = styled.div`
  margin-left: 20px;
`;

export const FolderTitle = styled.div<IFolderTitle>`
  display: flex;
  cursor: pointer;
  color: ${({ isOpen }) => (isOpen ? "darkgray" : "unset")};
`;

export const FolderCloseSvg = styled(FolderClose)`
  heigth: 16px;
  width: 16px;
  margin-right: 10px;
`;

export const FolderOpeneSvg = styled(FolderOpen)`
  heigth: 16px;
  width: 16px;
  margin-right: 10px;
`;
