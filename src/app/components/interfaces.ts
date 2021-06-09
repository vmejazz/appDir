export type ITreeItem = {
  id: string,
  title: string,
  children?: ITreeItem[];
}

export type IListItem = {
  id: string,
  title: string,
}

export interface IItem {
  title: string;
}

export type IFolderTitle = {
  isOpen?: boolean;
}
