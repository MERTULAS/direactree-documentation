"use client";

import React, { useState } from 'react'
import JSONPrinter from '@/components/JSONPrinter';
import Direactree, { DireactreeProps, TreeNode, SaveProps, NodePath } from 'direactree';

import { Slider, Switch } from 'antd';
import { FolderAddOutlined, EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';

const ClientDireactree = Direactree as unknown as React.ComponentType<DireactreeProps>;

const initialStructure: TreeNode[] = [{
  "id": "0",
  "name": "C:/",
  "type": "folder",
  "children": [
    {
      "id": "1",
      "name": "Users",
      "type": "folder",
      "children": [
        {
          "id": "2",
          "name": "John Doe",
          "type": "folder",
          "children": [
            {
              "id": "3", "name": "Documents", "type": "folder", "children": [
                { "id": "4", "name": "sample.tsx", "type": "file" }
              ]
            },
            { "id": "5", "name": "logs.txt", "type": "file" }
          ]
        }
      ]
    }
  ]
}]

const PropsSection = () => {
  const [structure, setStructure] = useState<TreeNode[]>(initialStructure);
  const [indentValue, setIndentValue] = useState(20);
  const [showToolboxValue, setShowToolboxValue] = useState(true);
  const [isAllExpandedValue, setIsAllExpandedValue] = useState(true);
  const [allowDragAndDropValue, setAllowDragAndDropValue] = useState(true);
  const [toolboxStickyValue, setToolboxStickyValue] = useState(true);
  const [selectedNode, setSelectedNode] = useState<NodePath | null>(null);
  const [sourceNode, setSourceNode] = useState<TreeNode | null>(null);
  const [targetNode, setTargetNode] = useState<TreeNode | null>(null);
  const [parentNode, setParentNode] = useState<NodePath | null>(null);
  const [saveProps, setSaveProps] = useState<SaveProps | null>(null);

  const toolboxIcons = {
    createFolder: <FolderAddOutlined />,
    createFile: <FileAddOutlined />,
    rename: <EditOutlined />,
    delete: <DeleteOutlined />
  };


  const handleSelectedNodeChange = (node: NodePath | null) => {
    setSelectedNode(node);
  };

  const handleNodeMove = (sourceNode: TreeNode, targetNode: TreeNode) => {
    setSourceNode(sourceNode);
    setTargetNode(targetNode);
  };

  const handleCreateFolder = (parentNode: NodePath | null) => {
    setParentNode(parentNode);
  };

  const handleCreateFile = (parentNode: NodePath | null) => {
    setParentNode(parentNode);
  };

  const handleRename = (node: NodePath | null) => {
    setParentNode(node);
  };

  const handleDelete = (node: NodePath | null) => {
    setParentNode(node);
  };

  const handleSave = (saveProps: SaveProps | null) => {
    setSaveProps(saveProps);
  };


  return (
    <div className="props-section">

      <h2>Direactree Props</h2>
      <p>Direactree provides the following props:</p>

      <div className="prop-card">
        <h3>structure</h3>
        <p>The <b>structure</b> prop is an object that represent the nodes in the directory tree.</p>
        <div>Type: <code>TreeNode</code>
          <div className='code-block'>
            <JSONPrinter data={
              {
                "id": 'string',
                "name": 'string',
                "type": `folder | file`,
                "children": 'TreeNode[]'
              }
            }
            />
          </div>
        </div>
        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} />`}</code></pre>
        <div className='example-container'>
          <div className='code-block'>
            <span>Structure</span> =
            <JSONPrinter data={structure} />
          </div>
          <div>
            <ClientDireactree structure={structure} />
          </div>
        </div>
      </div>

      <div className="prop-card">
        <h3>onSelectedNodeChange</h3>
        <p>The <b>onSelectedNodeChange</b> prop is a function that is called when the user selects a node.</p>
        <p>The function receives the selected node as an argument.</p>
        <div>Type: <code>{`(node: NodePath | null) => void`}</code>
          <p>NodePath</p>
          <div className='code-block'>
            <JSONPrinter data={
              {
                "name": 'string',
                "id": 'string',
                "type": 'file | folder',
                "parent": 'NodePath | null'
              }
            }
            />
          </div>
        </div>
        <p>Example:</p>
        <pre className="code-example"><code>{
          `
  const [selectedNode, setSelectedNode] = useState<NodePath | null>(null);
  
  const handleSelectedNodeChange = (node: NodePath | null) => {
    setSelectedNode(node);
  };

  <Direactree structure={structure} onSelectedNodeChange={handleSelectedNodeChange} />
      `}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <p>-&gt; Select a node and click on it to see the changes.</p>
        <div className='example-container'>
          <div className='code-block'>
            <span>selectedNode</span> =
            <JSONPrinter data={selectedNode || 'null'} />
          </div>
          <div>
            <ClientDireactree structure={structure} onSelectedNodeChange={handleSelectedNodeChange} />
          </div>
        </div>
      </div>

      <div className="prop-card">
        <h3>onNodeMove</h3>
        <p>The <b>onNodeMove</b> prop is a function that is called when the user moves a node.</p>
        <p>The function receives the moved source node and the target node as an argument.</p>

        <h3>NOTE:</h3>
        <ul>
          <li>The <b>onNodeMove</b> prop is not called when the user moves a node to <b>itself</b>.</li>
          <li>The <b>onNodeMove</b> prop is not called when the user moves a node to <b>its children</b>.</li>
          <li>The <b>onNodeMove</b> prop is not called when the user moves a node to <b>file</b> node.</li>
        </ul>

        <div>Type: <code>{`(sourceNode: TreeNode, targetNode: TreeNode) => void`}</code>
          <p>TreeNode</p>
          <div className='code-block'>
            <JSONPrinter data={
              {
                "id": 'string',
                "name": 'string',
                "type": `folder | file`,
                "children": 'TreeNode[]'
              }
            }
            />
          </div>
        </div>
        <p>Example:</p>
        <pre className="code-example"><code>{
          `
  const [sourceNode, setSourceNode] = useState<TreeNode | null>(null);
  const [targetNode, setTargetNode] = useState<TreeNode | null>(null);

  const handleNodeMove = (sourceNode: TreeNode, targetNode: TreeNode) => {
    setSourceNode(sourceNode);
    setTargetNode(targetNode);
  };

  <Direactree structure={structure} onNodeMove={handleNodeMove} />
      `}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <p>-&gt; Select a node and move it to another node to see the changes.</p>
        <div className='example-container'>
          <div className='code-block'>
            <span>sourceNode</span> =
            <JSONPrinter data={sourceNode || 'null'} />
          </div>
          <div className='code-block'>
            <span>targetNode</span> =
            <JSONPrinter data={targetNode || 'null'} />
          </div>
          <div>
            <ClientDireactree structure={structure} onNodeMove={handleNodeMove} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>onCreateFolder, onCreateFile, onRename, onDelete</h3>
        <p>The <b>onCreateFolder</b> prop is a function that is called when the user creates a folder in a selected node.</p>
        <p>The <b>onCreateFile</b> prop is a function that is called when the user creates a file in a selected node.</p>
        <p>The functions above receives the parent node as an argument.</p>
        <p>The <b>onRename</b> prop is a function that is called when the user renames a selected node.</p>
        <p>The <b>onDelete</b> prop is a function that is called when the user deletes a selectednode.</p>
        <p>The functions above receives the selected node as an argument.</p>

        <h3>NOTE:</h3>
        <ul>
          <li>If the user not select any node, the function (<b>onCreateFolder</b>, <b>onCreateFile</b>) will receive <code>null</code> as an argument and the new node will be created at the root of the tree.</li>
        </ul>

        <div>Type: <code>{`(parentNode: NodePath) => void`}</code>
          <p>NodePath</p>
          <div className='code-block'>
            <JSONPrinter data={
              {
                "name": 'string',
                "id": 'string',
                "type": 'file | folder',
                "parent": 'NodePath | null'
              }
            }
            />
          </div>
        </div>
        <p>Example:</p>
        <pre className="code-example"><code>{
          `
  const [parentNode, setParentNode] = useState<NodePath | null>(null);

  const handleCreateFolder = (parentNode: NodePath | null) => {
    setParentNode(parentNode);
  };

  const handleCreateFile = (parentNode: NodePath | null) => {
    setParentNode(parentNode);
  };

  const handleRename = (node: NodePath | null) => {
    setParentNode(node);
  };  

  const handleDelete = (node: NodePath | null) => {
    setParentNode(node);
  };

  <Direactree structure={structure} onCreateFolder={handleCreateFolder} onCreateFile={handleCreateFile} onRename={handleRename} onDelete={handleDelete} />
      `}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <p>-&gt; Select a node and click on the toolbox icons to see the changes.</p>
        <div className='example-container'>
          <div className='code-block'>
            <span>parentNode</span> =
            <JSONPrinter data={parentNode || 'null'} />
          </div>
          <div>
            <ClientDireactree structure={structure} onCreateFolder={handleCreateFolder} onCreateFile={handleCreateFile} onRename={handleRename} onDelete={handleDelete} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>onSave</h3>
        <p>The <b>onSave</b> prop is a function that is called when the user clicks on the save button on the editable area.</p>
        <p>The function receives the save props as an argument.</p>

        <div>Type: <code>{`(saveProps: SaveProps) => void`}</code>
          <p>SaveProps</p>
          <div className='code-block'>
            <JSONPrinter data={
              {
                newName: 'string',
                selectedNode: 'NodePath | null',
                actionType: 'create | edit',
                createType: 'folder | file'
              }
            }
            />
          </div>
          <p><b>NodePath</b> as you know.</p>
        </div>
        <p>Example:</p>
        <pre className="code-example"><code>{
          `
  const [saveProps, setSaveProps] = useState<SaveProps | null>(null);

  const handleSave = (saveProps: SaveProps | null) => {
    setSaveProps(saveProps);
  };

  <Direactree structure={structure} onSave={handleSave} />
      `}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <p>-&gt; Select a node, and click on the toolbox, fill the input and click on the save button to see the changes.</p>
        <div className='example-container'>
          <div className='code-block'>
            <span>saveProps</span> =
            <JSONPrinter data={saveProps || 'null'} />
          </div>
          <div>
            <ClientDireactree structure={structure} onSave={handleSave} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>isAllExpanded</h3>
        <p>The <b>isAllExpanded</b> prop is a boolean value that determines whether all nodes are expanded for initial render.</p>
        <div>Default value is <code>false</code>.</div>
        <div>Type: <code>boolean</code></div>

        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} isAllExpanded={${isAllExpandedValue}} />`}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <div className="interactive-example">
          <div>
            <Switch checked={isAllExpandedValue} onChange={setIsAllExpandedValue} />
            <span><b>isAllExpanded:</b> {isAllExpandedValue ? 'true' : 'false'}</span>
          </div>

          <div>
            <ClientDireactree structure={structure} isAllExpanded={isAllExpandedValue} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>indent</h3>
        <p>The <b>indent</b> prop is the number of spaces to indent the tree.</p>
        <div>Minimum value is <code>8</code>. and maximum value is <code>50</code>.</div>
        <div> If the value is less than <code>8</code>, it will be set to <code>8</code>.</div>
        <div> If the value is greater than <code>50</code>, it will be set to <code>50</code>.</div>
        <div>Default value is <code>20</code>.</div>
        <div>Type: <code>number</code></div>
        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} indent={${indentValue}} />`}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <div className="interactive-example">
          <div>
            <Slider defaultValue={indentValue} min={8} max={50} step={1} value={indentValue} onChange={setIndentValue} />
            <span><b>indent:</b> {indentValue}</span>
          </div>
          <div>
            <ClientDireactree structure={structure} indent={indentValue} isAllExpanded={isAllExpandedValue} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>allowDragAndDrop</h3>
        <p>The <b>allowDragAndDrop</b> prop is a boolean value that determines whether to allow drag and drop.</p>
        <div>Default value is <code>true</code>.</div>
        <div>Type: <code>boolean</code></div>

        <h3>When to use?</h3>
        <ul className='when-to-use'>
          <li>If the component only show the directory tree and you don't want to change the structure, you can set the <b>allowDragAndDrop</b> prop to <code>false</code>.</li>
        </ul>

        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} allowDragAndDrop={${allowDragAndDropValue}} />`}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <div className="interactive-example">
          <div>
            <Switch checked={allowDragAndDropValue} onChange={setAllowDragAndDropValue} />
            <span><b>allowDragAndDrop:</b> {allowDragAndDropValue ? 'true' : 'false'}</span>
          </div>
          <div>
            <ClientDireactree structure={structure} allowDragAndDrop={allowDragAndDropValue} isAllExpanded={isAllExpandedValue} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>showToolbox</h3>

        <p>The <b>showToolbox</b> prop is a boolean value that determines whether to show the toolbox.</p>
        <div>Default value is <code>true</code>.</div>
        <div>Type: <code>boolean</code></div>

        <h3>When to use?</h3>
        <ul className='when-to-use'>
          <li>If the component only show the directory tree and you don't want to change the structure, you can set the <b>showToolbox</b> prop to <code>false</code>.</li>
        </ul>
        <br />

        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} showToolbox={${showToolboxValue}} />`}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <div className="interactive-example">
          <div>
            <Switch checked={showToolboxValue} onChange={setShowToolboxValue} />
            <span><b>showToolbox:</b> {showToolboxValue ? 'true' : 'false'}</span>
          </div>
          <div>
            <ClientDireactree structure={structure} showToolbox={showToolboxValue} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>toolboxIcons</h3>

        <p>The <b>toolboxIcons</b> prop is an object that determines the custom icons of the toolbox.</p>
        <div>Type: <code>ToolboxIcons</code>
          <div className='code-block'>
            <JSONPrinter data={
              {
                "createFolder?": 'React.ReactNode',
                "createFile?": 'React.ReactNode',
                "rename?": 'React.ReactNode',
                "delete?": 'React.ReactNode'
              }
            }
            />
          </div>
        </div>


        <h3>When to use?</h3>
        <ul className='when-to-use'>
          <li>If you want to use custom icons, you can set the <b>toolboxIcons</b> prop.</li>
        </ul>
        <br />

        <p>Example:</p>
        <pre className="code-example">
          <code>
            {`const toolboxIcons = {
  createFolder: <FolderAddOutlined />,
  createFile: <FileAddOutlined />,
  rename: <EditOutlined />,
  delete: <DeleteOutlined />
};

<Direactree 
  structure={structure} 
  toolboxIcons={toolboxIcons} 
/>`}
          </code>
        </pre>
        <div className="interactive-example">
          <div>
            <ClientDireactree structure={structure} toolboxIcons={toolboxIcons} />
          </div>
        </div>
      </div>


      <div className="prop-card">
        <h3>toolboxSticky</h3>

        <p>The <b>toolboxSticky</b> prop is a boolean value that determines whether to make the toolbox sticky.</p>
        <div>Default value is <code>false</code>.</div>
        <div>Type: <code>boolean</code></div>

        <h3>When to use?</h3>
        <ul className='when-to-use'>
          <li>If you want to make the toolbox sticky when the user scrolls, you can set the <b>toolboxSticky</b> prop to <code>true</code>.</li>
        </ul>
        <br />

        <p>Example:</p>
        <pre className="code-example"><code>{`<Direactree structure={structure} toolboxSticky={${toolboxStickyValue}} />`}</code></pre>
        <h3 className='try-it'>Try it!</h3>
        <div className="interactive-example">
          <div>
            <Switch checked={toolboxStickyValue} onChange={setToolboxStickyValue} />
            <span><b>toolboxSticky:</b> {toolboxStickyValue ? 'true' : 'false'}</span>
          </div>
          <div style={{ height: '200px', overflow: 'auto' }}>
            <ClientDireactree structure={structure} toolboxSticky={toolboxStickyValue} isAllExpanded={true} />
          </div>
        </div>
      </div>


    </div>
  )
}

export default PropsSection;