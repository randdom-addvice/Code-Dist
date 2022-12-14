export interface IFile {
  _id: string;
  file_type: string;
  file_name: string;
  file_dir: string;
  file_content: string;
  file_id: string;
  isDirectory: boolean;
  isModified?: boolean;
  isUntitled?: boolean;
}

export interface IDirectory {
  _id: string;
  directory_name: string;
  directory_path: string;
  directory_id: string;
  isDirectory: boolean;
  sub_directory: IDirectory[];
  files: IFile[];
}

export interface IDirectoryTree {
  directories: IDirectory[];
  root_dir_files: IFile[];
}
