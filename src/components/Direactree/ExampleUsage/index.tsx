"use client";
import styles from "@/app/page.module.css";
import { useState } from "react";
import Direactree, { DireactreeProps, NodePath, SaveProps, TreeNode } from "direactree";
import { FolderAddOutlined, FileAddOutlined } from "@ant-design/icons";

const ClientDireactree = Direactree as unknown as React.ComponentType<DireactreeProps>;

export default function ExampleUsage() {
  const [selectedFile, setSelectedFile] = useState<NodePath | null>(null);
  const [fileContent, setFileContent] = useState<string | null>("");
  const [structure, setStructure] = useState<TreeNode[]>([
    {
      id: '0',
      name: 'Desktop',
      type: 'folder',
      children: [
        {
          id: '1',
          name: 'Projects',
          type: 'folder',
          children: [
            {
              id: '1.1',
              name: 'Web Applications',
              type: 'folder',
              children: [
                {
                  id: '1.1.1',
                  name: 'React Projects',
                  type: 'folder',
                  children: [
                    {
                      id: 'sample.txt',
                      name: 'project-notes.txt',
                      type: 'file',
                    },
                    {
                      id: 'example.json',
                      name: 'config.json',
                      type: 'file',
                    },
                    {
                      id: 'sample.ts',
                      name: 'utils.ts',
                      type: 'file',
                    }
                  ],
                },
              ],
            },
          ],
        },
        {
          id: '2',
          name: 'Documents',
          type: 'folder',
          children: [
            {
              id: '2.1',
              name: 'Technical Documents',
              type: 'folder',
              children: [
                {
                  id: '2.1.1',
                  name: 'API Documents',
                  type: 'folder',
                  children: [
                    {
                      id: '2.1.1.1',
                      name: 'REST-API.md',
                      type: 'file',
                    }
                  ],
                },
              ],
            },
          ],
        },
      ]
    }]);

  const findNodeById = (nodes: TreeNode[], id: string): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentNode = (nodes: TreeNode[], id: string, parent: TreeNode | null = null): TreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return parent;
      if (node.children) {
        const found = findParentNode(node.children, id, node);
        if (found) return found;
      }
    }
    return null;
  };

  // Creates a unique id for the node
  const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Creates a folder
  const handleCreateFolder = (nodePath: NodePath | null) => {
    console.log('Folder creation started:', nodePath);
    // Here nodePath represents the selected node
    // The Direactree component will show its own input field
  };

  // Creates a file
  const handleCreateFile = (nodePath: NodePath | null) => {
    console.log('File creation started:', nodePath);
    // Here nodePath represents the selected node
    // The Direactree component will show its own input field
  };

  // Renames a node
  const handleRename = (nodePath: NodePath) => {
    console.log('Renaming started:', nodePath);
    // Here nodePath represents the selected node
    // The Direactree component will show its own input field
  };

  // Deletes a node
  const handleDelete = (nodePath: NodePath) => {
    console.log('Deleting started:', nodePath);

    setStructure(prevStructure => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure));

      const rootIndex = newStructure.findIndex((node: TreeNode) => node.id === nodePath.id);
      if (rootIndex !== -1) {
        newStructure.splice(rootIndex, 1);
        return newStructure;
      }

      const parentNode = findParentNode(newStructure, nodePath.id);
      if (parentNode && parentNode.children) {
        const childIndex = parentNode.children.findIndex((node: TreeNode) => node.id === nodePath.id);
        if (childIndex !== -1) {
          parentNode.children.splice(childIndex, 1);
        }
      }

      return newStructure;
    });

    // If the deleted file is the selected file, clear the selection
    if (selectedFile && selectedFile.id === nodePath.id) {
      setSelectedFile(null);
      setFileContent("");
    }
  };

  // Handles the results of all operations
  const handleSave = (props: SaveProps) => {

    // This example is shown over the state update.
    // If the directory structure is managed on the backend (e.g. database), the file/folder name update can be requested to the relevant API endpoint using the data in props.
    // Here, the data in 'props' can be used to request the relevant API endpoint.

    switch (props.actionType) {
      case 'create':
        // Creates a new folder or file
        const newNode: TreeNode = {
          id: generateUniqueId(),
          name: props.newName,
          type: props.createType! // createType is defined as 'file' or 'folder' in SaveProps and this is guaranteed
        };

        if (props.createType === 'folder') {
          newNode.children = [];
        }

        console.log('props selectedNode', props.selectedNode);

        setStructure(prevStructure => {
          const newStructure = JSON.parse(JSON.stringify(prevStructure));

          if (props.selectedNode) {
            const selectedNode = findNodeById(newStructure, props.selectedNode.id);

            if (selectedNode) {
              if (!selectedNode.children) selectedNode.children = [];
              selectedNode.children.push(newNode);

              return newStructure;
            }
          }

          newStructure.push(newNode);

          console.log('Added to the root:', newNode);
          return newStructure;
        });

        console.log(`New ${props.createType === 'folder' ? 'folder' : 'file'} creation process completed`);
        break;

      case 'edit':

        setStructure(prevStructure => {
          const newStructure = JSON.parse(JSON.stringify(prevStructure));


          const targetNode = findNodeById(newStructure, props.selectedNode?.id || "");

          if (targetNode) {
            targetNode.name = props.newName || "";

            if (selectedFile && selectedFile.id === props.selectedNode?.id) {
              setSelectedFile({
                ...selectedFile,
                name: props.newName || ""
              });
            }
          }


          return newStructure;
        });

        console.log('Renamed:', props.selectedNode?.id, 'new name:', props.newName);
        break;

      default:
        console.log('Unknown action type:', props.actionType);
    }
  };

  const handleSelectedNodeChange = (node: NodePath) => {
    setSelectedFile(node);

    if (node.type === 'file') {
      fetch(`/api/file?fileName=${node.id}`)
        .then(response => response.text())
        .then(data => setFileContent(data))
        .catch(error => {
          console.error('Error while fetching file content:', error);
          setFileContent("Content not found for this file.");
        });
    } else {
      setFileContent("");
    }
  };

  const handleNodeMove = (node: TreeNode, newParent: TreeNode | null) => {
    console.log('Node moving process:', node, 'new parent:', newParent);

    setStructure(prevStructure => {
      const newStructure = JSON.parse(JSON.stringify(prevStructure)) as TreeNode[];

      const removeNodeFromParent = (nodes: TreeNode[], nodeId: string): boolean => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === nodeId) {
            nodes.splice(i, 1);
            return true;
          }

          const children = nodes[i].children;
          if (children && children.length > 0) {
            if (removeNodeFromParent(children, nodeId)) {
              return true;
            }
          }
        }
        return false;
      };

      removeNodeFromParent(newStructure, node.id);

      if (newParent === null) {
        newStructure.push(node);
      } else {
        const targetNode = findNodeById(newStructure, newParent.id);

        if (targetNode) {
          if (!targetNode.children) {
            targetNode.children = [];
          }

          targetNode.children.push(node);
        }
      }

      return newStructure;
    });
  };

  return (
    <div>
      <h2>Direactree Example Usage</h2>
      <p>This example shows the example usage of the Direactree component.</p>
      <h3>Direactree Features</h3>
      <ul>
        <li>Create Folder anywhere in the tree</li>
        <li>Create File anywhere in the tree</li>
        <li>Rename file or folder anywhere in the tree</li>
        <li>Delete file or folder anywhere in the tree</li>
        <li>Move file or folder anywhere in the tree</li>
      </ul>

      <h3><b>NOTE:</b> Directree guarantees the following:</h3>
      <ul>
        <li>Folder or file can't move to itself</li>
        <li>Folders can't move to its children</li>
        <li>Folders or files can't create in the file</li>
      </ul>

      <div className={styles.container}>
        <div className={styles.treeContainer}>
          <h2>File Explorer</h2>
          <ClientDireactree
            onSelectedNodeChange={handleSelectedNodeChange}
            structure={structure}
            indent={20}
            showToolbox={true}
            onCreateFolder={handleCreateFolder}
            onCreateFile={handleCreateFile}
            onRename={handleRename}
            onDelete={handleDelete}
            onSave={handleSave}
            toolboxIcons={{
              createFolder: <FolderAddOutlined />,
              createFile: <FileAddOutlined />
            }}
            toolboxSticky={true}
            onNodeMove={handleNodeMove}
            isAllExpanded={true}
          />
        </div>

        <div className={styles.fileContent}>
          <h2>Selected Node Name: {selectedFile ? selectedFile.name : 'File not selected'}</h2>
          <pre
            style={{
              width: '100%',
              minHeight: '400px',
              height: '95%',
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: 'black',
              overflowY: 'auto',
            }}
          >
            {fileContent || 'File content will be displayed here...'}
          </pre>
        </div>
      </div>
    </div>
  );
};
