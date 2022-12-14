import { gql, useMutation } from "@apollo/client";
import {
  IDirectory,
  IDirectoryTree,
  IFile,
} from "@/graphql/models/app.interface";
import { GET_DIRECTORY_TREE } from "@/graphql/queries/app.queries";

const CREATE_DIRECTORY = gql`
  mutation CreateDirectory($input: DirectoryInput!) {
    createDirectory(input: $input) {
      _id
      directory_id
      directory_name
      directory_path
      isDirectory
      sub_directory {
        _id
      }
      files {
        _id
      }
    }
  }
`;
const DELETE_DIRECTORY = gql`
  mutation DeleteDirectory($input: DeleteDirectoryInput!) {
    deleteDirectory(input: $input)
  }
`;
const RENAME_DIRECTORY = gql`
  mutation RenameDirectory($input: RenameDirectoryInput!) {
    renameDirectory(input: $input)
  }
`;
const DELETE_FILE = gql`
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input)
  }
`;
const CREATE_FILE = gql`
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      _id
      file_id
      file_type
      file_name
      file_dir
      file_content
    }
  }
`;
const RENAME_FILE = gql`
  mutation RenameFile($input: RenameFileInput!) {
    renameFile(input: $input)
  }
`;
const MOVE_FILE = gql`
  mutation MoveFile($input: MoveFileInput!) {
    moveFile(input: $input)
  }
`;
const MOVE_DIRECTORY = gql`
  mutation MoveDirectory($input: MoveDirectoryInput!) {
    moveDirectory(input: $input) {
      _id
    }
  }
`;
const UPLOAD_DIRECTORY = gql`
  mutation UploadZip($file: Upload!) {
    uploadZip(file: $file)
  }
`;
const UPDATE_FILE_CONTENT = gql`
  mutation UpdateFileContent($input: UpdateFileContentInput!) {
    updateFileContent(input: $input)
  }
`;

export const useCreateDirectory = (args: {
  directoryName: string;
  directoryPath: string;
}) => {
  const [createDirectoryMutation, { error, data }] = useMutation<
    { createDirectory: IDirectory },
    { input: Pick<IDirectory, "directory_name" | "directory_path"> }
  >(CREATE_DIRECTORY, {
    variables: {
      input: {
        directory_name: args.directoryName,
        directory_path: args.directoryPath,
      },
    },
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let createdDirectoryData = [...data.getDirectoryTree.directories];
    //   createdDirectoryData = [
    //     result.data?.createDirectory as IDirectory,
    //     ...createdDirectoryData,
    //   ];
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       ...data,
    //       getDirectoryTree: {
    //         createdDirectoryData,
    //       },
    //     },
    //   });
    // },
  });

  return { createDirectoryMutation, data, error };
};

export const useDeleteDirectory = (id: string) => {
  const [deleteDirectory, { error, data }] = useMutation<
    { deleteDirectory: boolean },
    { input: Pick<IDirectory, "_id"> }
  >(DELETE_DIRECTORY, {
    variables: {
      input: {
        _id: id,
      },
    },
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let allDirectories = [...data.getDirectoryTree.directories];

    //   function recursiveFilter(items: IDirectory[]) {
    //     const updated = items.map((i) => {
    //       if (i.sub_directory && i.sub_directory.length > 0)
    //         recursiveFilter(i.sub_directory);
    //       if (i._id === id) i = null as any; //cannot use delete while in strict mode
    //       return i;
    //     });
    //     return updated;
    //   }

    //   const filteredDirectories = recursiveFilter(allDirectories);
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       getDirectoryTree: {
    //         filteredDirectories,
    //       },
    //     },
    //   });
    // },
  });

  return { deleteDirectory, data, error };
};

export const useRenameDirectory = (args: {
  directoryName: string;
  id: string;
}) => {
  const [renameDirectoryMutation, { error, data }] = useMutation<
    { renameDirectory: string },
    { input: Pick<IDirectory, "_id" | "directory_name"> }
  >(RENAME_DIRECTORY, {
    variables: {
      input: {
        _id: args.id,
        directory_name: args.directoryName,
      },
    },
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let allDirectories = [...data.getDirectoryTree.directories];

    //   function recursiveFilter(items: IDirectory[]) {
    //     const updated = items.map((i) => {
    //       if (i.sub_directory && i.sub_directory.length > 0)
    //         recursiveFilter(i.sub_directory);
    //       if (i._id === args.id) {
    //         // i.directory_name = args.directoryName;
    //         // i.directory_path = result.data?.renameDirectory ?? i.directory_path;
    //       }
    //       return i;
    //     });
    //     return updated;
    //   }

    //   const filteredDirectories = recursiveFilter(allDirectories);
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       getDirectoryTree: {
    //         filteredDirectories,
    //       },
    //     },
    //   });
    // },
  });

  return { renameDirectoryMutation, data, error };
};

export const useCreateFile = (args: { fileName: string; dir: string }) => {
  const [createFileMutation, { error, data }] = useMutation<
    { createFile: IFile },
    { input: Pick<IFile, "file_name" | "file_dir"> }
  >(CREATE_FILE, {
    variables: {
      input: {
        file_name: args.fileName,
        file_dir: args.dir,
      },
    },
    // update(proxy) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let allDirectories = [...data.getDirectoryTree.directories];
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       getDirectoryTree: {
    //         allDirectories,
    //       },
    //     },
    //   });
    // },
  });

  return { createFileMutation, data, error };
};

export const useRenameFile = (args: { fileName: string; id: string }) => {
  const [renameFileMutation, { error, data }] = useMutation<
    { RenameFile: string },
    { input: Pick<IFile, "file_id" | "file_name"> }
  >(RENAME_FILE, {
    variables: {
      input: {
        file_id: args.id,
        file_name: args.fileName,
      },
    },
    // update(proxy) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let allDirectories = [...data.getDirectoryTree.directories];
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       getDirectoryTree: {
    //         allDirectories,
    //       },
    //     },
    //   });
    // },
  });

  return { renameFileMutation, data, error };
};

export const useMoveFile = (args: {
  destination_path: string;
  file_id: string;
}) => {
  const [moveFileMutation, { error, data }] = useMutation<
    { moveFile: boolean },
    { input: Pick<IFile, "file_id"> & { destination_path: string } }
  >(MOVE_FILE, {
    variables: {
      input: {
        file_id: args.file_id,
        destination_path: args.destination_path,
      },
    },
  });

  return { moveFileMutation, data, error };
};

export const useMoveDirectory = () => {
  const [moveDirectoryMutation, { error, data }] = useMutation<
    { moveDirectory: IDirectory },
    { input: { destination_path: string; from_id: string } }
  >(MOVE_DIRECTORY);

  return { moveDirectoryMutation, data, error };
};

export const useDeleteFile = (id: string) => {
  const [deleteFile, { error, data }] = useMutation<
    { deleteFile: boolean },
    { input: Pick<IFile, "file_id"> }
  >(DELETE_FILE, {
    variables: {
      input: {
        file_id: id,
      },
    },
    // update(proxy) {
    //   const data = proxy.readQuery({
    //     query: GET_DIRECTORY_TREE,
    //   }) as { getDirectoryTree: IDirectoryTree };
    //   let allDirectories = [...data.getDirectoryTree.directories];
    //   proxy.writeQuery({
    //     query: GET_DIRECTORY_TREE,
    //     data: {
    //       getDirectoryTree: {
    //         allDirectories,
    //       },
    //     },
    //   });
    // },
  });

  return { deleteFile, data, error };
};

export const useUploadDirectory = () => {
  const [uploadDirectory, { loading, error }] = useMutation(UPLOAD_DIRECTORY);

  return { loading, error, uploadDirectory };
};

export const useUpdateFileContent = () => {
  const [updateFileContent, { error, data }] = useMutation(UPDATE_FILE_CONTENT);

  return { updateFileContent, data, error };
};
// export const useUpdateFileContent = (args: {
//   fileId: string;
//   fileContent: string;
// }) => {
//   const [updateFileContent, { error, data }] = useMutation<
//     { updateFileContent: boolean },
//     { input: Pick<IFile, "_id" | "file_content"> }
//   >(UPDATE_FILE_CONTENT, {
//     variables: {
// input: {
//   _id: args.fileId,
//   file_content: args.fileContent,
// },
//     },
//   });

//   return { updateFileContent, data, error };
// };
