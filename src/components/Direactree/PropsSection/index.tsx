"use client";

import React, { useState } from 'react'
import JSONPrinter from '@/components/JSONPrinter';
import Direactree from 'direactree';
import { Slider, Switch } from 'antd';
import { FolderAddOutlined, EditOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';

const PropsSection = () => {
  const [indentValue, setIndentValue] = useState(20);
  const [showToolboxValue, setShowToolboxValue] = useState(true);
  const [isAllExpandedValue, setIsAllExpandedValue] = useState(true);
  const [allowDragAndDropValue, setAllowDragAndDropValue] = useState(true);
  const [toolboxStickyValue, setToolboxStickyValue] = useState(true);

  const toolboxIcons = {
    createFolder: <FolderAddOutlined />,
    createFile: <FileAddOutlined />,
    rename: <EditOutlined />,
    delete: <DeleteOutlined />
  };

  const structure = [{
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


  return (
    <div>

      <h2>Direactree Props</h2>
      <p>Direactree provides the following props:</p>

      <h3>structure</h3>
      <p>The <b>structure</b> prop is an object that represent the nodes in the directory tree.</p>
      <p><code>
        {`<Direactree structure={structure} />`}
      </code></p>


      <p>Type: <code>TreeNode</code>
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
      </p>
      <p>Example:</p>
      <div className='example-container'>
        <div className='code-block'>
          <span>Structure</span> =
          <JSONPrinter data={structure} />
        </div>
        <div>
          <Direactree structure={structure} />
        </div>
      </div>


      <h3>isAllExpanded</h3>
      <p>The <b>isAllExpanded</b> prop is a boolean value that determines whether all nodes are expanded for initial render.</p>
      <p>Default value is <code>false</code>.</p>
      <p>Type: <code>boolean</code></p>
      <p>Example:</p>
      <p><code>
        {`<Direactree structure={structure} isAllExpanded={${isAllExpandedValue}} />`}
      </code></p>
      <br />
      <p><code>
        {`<Direactree structure={structure} indent={${indentValue}} />`}
      </code></p>

      <p>Type: <code>boolean</code></p>
      <p>Example:</p>
      <div>
        <Switch checked={isAllExpandedValue} onChange={setIsAllExpandedValue} />
        <span><b>isAllExpanded:</b> {isAllExpandedValue ? 'true' : 'false'}</span>
        <div>
          <Direactree structure={structure} isAllExpanded={isAllExpandedValue} />
        </div>
      </div>



      <h3>indent</h3>
      <p>The <b>indent</b> prop is the number of spaces to indent the tree.</p>
      <p>Minimum value is <code>8</code>. and maximum value is <code>50</code>.</p>
      <p> If the value is less than <code>8</code>, it will be set to <code>8</code>.</p>
      <p> If the value is greater than <code>50</code>, it will be set to <code>50</code>.</p>
      <br />
      <p><code>
        {`<Direactree structure={structure} indent={${indentValue}} />`}
      </code></p>

      <p>Type: <code>number</code></p>
      <p>Example:</p>
      <div>
        <Slider defaultValue={indentValue} min={8} max={50} step={1} value={indentValue} onChange={setIndentValue} />
        <span><b>indent:</b> {indentValue}</span>
        <div>
          <Direactree structure={structure} indent={indentValue} isAllExpanded={isAllExpandedValue} />
        </div>
      </div>


      <h3>allowDragAndDrop</h3>
      <p>The <b>allowDragAndDrop</b> prop is a boolean value that determines whether to allow drag and drop.</p>
      <p>Default value is <code>true</code>.</p>
      <br />
      <p><code>
        {`<Direactree structure={structure} allowDragAndDrop={${allowDragAndDropValue}} />`}
      </code></p>

      <p>Type: <code>boolean</code></p>

      <h3>When to use?</h3>
      <ul className='when-to-use'>
        <li>If the component only show the directory tree and you don't want to change the structure, you can set the <b>allowDragAndDrop</b> prop to <code>false</code>.</li>
      </ul>

      <p>Example:</p>
      <div>
        <Switch checked={allowDragAndDropValue} onChange={setAllowDragAndDropValue} />
        <span><b>allowDragAndDrop:</b> {allowDragAndDropValue ? 'true' : 'false'}</span>
        <div>
          <Direactree structure={structure} allowDragAndDrop={allowDragAndDropValue} isAllExpanded={isAllExpandedValue} />
        </div>
      </div>



      <h3>showToolbox</h3>

      <p>The <b>showToolbox</b> prop is a boolean value that determines whether to show the toolbox.</p>
      <p>Default value is <code>true</code>.</p>
      <p>Type: <code>boolean</code></p>

      <h3>When to use?</h3>
      <ul className='when-to-use'>
        <li>If the component only show the directory tree and you don't want to change the structure, you can set the <b>showToolbox</b> prop to <code>false</code>.</li>
        <li>If you want use custom toolbox, you can set the <b>showToolbox</b> prop to <code>false</code>.</li>
      </ul>
      <br />

      <p>Example:</p>
      <p><code>
        {`<Direactree structure={structure} showToolbox={${showToolboxValue}} />`}
      </code></p>
      <div>
        <Switch checked={showToolboxValue} onChange={setShowToolboxValue} />
        <p><b>showToolbox:</b> {showToolboxValue ? 'true' : 'false'}</p>
        <div>
          <Direactree structure={structure} showToolbox={showToolboxValue} />
        </div>
      </div>


      <h3>toolboxIcons</h3>

      <p>The <b>toolboxIcons</b> prop is an object that determines the custom icons of the toolbox.</p>
      <p>Type: <code>ToolboxIcons</code>
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
      </p>


      <h3>When to use?</h3>
      <ul className='when-to-use'>
        <li>If you want to use custom icons, you can set the <b>toolboxIcons</b> prop.</li>
      </ul>
      <br />

      <p>Example:</p>
      <pre>
        <code>
          {
            `const toolboxIcons = {
            createFolder: <FolderAddOutlined />,
            createFile: <FileAddOutlined />,
            rename: <EditOutlined />,
            delete: <DeleteOutlined />
          };
<Direactree structure={structure} toolboxIcons={toolboxIcons} />`
          }
        </code>
      </pre>
      <div>
        <div>
          <Direactree structure={structure} toolboxIcons={toolboxIcons} />
        </div>
      </div>



      <h3>toolboxSticky</h3>

      <p>The <b>toolboxSticky</b> prop is a boolean value that determines whether to make the toolbox sticky.</p>
      <p>Default value is <code>false</code>.</p>
      <p>Type: <code>boolean</code></p>

      <h3>When to use?</h3>
      <ul className='when-to-use'>
        <li>If you want to make the toolbox sticky when the user scrolls, you can set the <b>toolboxSticky</b> prop to <code>true</code>.</li>
      </ul>
      <br />

      <p>Example:</p>
      <p><code>
        {`<Direactree structure={structure} toolboxSticky={${toolboxStickyValue}} />`}
      </code></p>
      <div>
        <Switch checked={toolboxStickyValue} onChange={setToolboxStickyValue} />
        <p><b>toolboxSticky:</b> {toolboxStickyValue ? 'true' : 'false'}</p>
        <div style={{ height: '200px', overflow: 'auto' }}>
          <Direactree structure={structure} toolboxSticky={toolboxStickyValue} isAllExpanded={true} />
        </div>
      </div>


    </div>
  )
}

export default PropsSection;