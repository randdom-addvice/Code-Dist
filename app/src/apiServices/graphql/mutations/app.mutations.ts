import { gql, useMutation } from "@apollo/client";
import { IDirectory } from "@/graphql/models/app.interface";
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

export const useCreateDirectory = (args: {
  directoryName: string;
  directoryPath: string;
}) => {
  const [createDirectory, { error, data }] = useMutation<
    { createDirectory: IDirectory },
    { input: Pick<IDirectory, "directory_name" | "directory_path"> }
  >(CREATE_DIRECTORY, {
    variables: {
      input: {
        directory_name: args.directoryName,
        directory_path: args.directoryPath,
      },
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_DIRECTORY_TREE,
      }) as { getDirectoryTree: IDirectory[] };
      let createdDirectoryData = [...data.getDirectoryTree];
      createdDirectoryData = [
        result.data?.createDirectory as IDirectory,
        ...createdDirectoryData,
      ];
      proxy.writeQuery({
        query: GET_DIRECTORY_TREE,
        data: {
          ...data,
          getDirectoryTree: {
            createdDirectoryData,
          },
        },
      });
    },
  });

  return { createDirectory, data, error };
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
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_DIRECTORY_TREE,
      }) as { getDirectoryTree: IDirectory[] };
      let allDirectories = [...data.getDirectoryTree];

      function recursiveFilter(items: IDirectory[]) {
        const updated = items.map((i) => {
          if (i.sub_directory && i.sub_directory.length > 0)
            recursiveFilter(i.sub_directory);
          if (i._id === id) i = null as any; //cannot use delete while in strict mode
          return i;
        });
        return updated;
      }

      const filteredDirectories = recursiveFilter(allDirectories);
      proxy.writeQuery({
        query: GET_DIRECTORY_TREE,
        data: {
          getDirectoryTree: {
            filteredDirectories,
          },
        },
      });
    },
  });

  return { deleteDirectory, data, error };
};
