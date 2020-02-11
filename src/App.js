import React, { useEffect, useMemo, useState, useCallback } from 'react';
import  { MdCode, MdFormatBold, MdFormatItalic } from 'react-icons/md';

import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import './App.css';

import { toggleCodeBlock, toggleItalicMark, toggleBoldMark } from './helpers/customEditor'



const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('content'))
    || '' || initialValue
  )

  const [isBoldActive, setIsBoldActive] = useState(false)

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <div className="app">
      <div className="editor">
        <Slate 
          editor={editor} 
          value={value} 
          onChange={value => {
            setValue(value)
            const content = JSON.stringify(value)
            localStorage.setItem('content', content)
          }}
        >
          <div className='toolbar'>
              <MdFormatBold
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer'}}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleBoldMark(editor)
                }}
              />
              <MdFormatItalic
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer'}}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleItalicMark(editor)
                }}
              />
              <MdCode
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleCodeBlock(editor)
                }}
              />
          </div>
          <Editable
            spellCheck='false'
            autoFocus='true'
            placeholder="Enter some rich text…"
            editor={editor}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={event => {
              if (!event.ctrlKey) {
                return
              }

              switch (event.key) {

                case 'k': {
                  event.preventDefault()
                  toggleCodeBlock(editor)
                  break
                }

                case 'b': {
                  event.preventDefault()
                  toggleBoldMark(editor)
                  break
                }

                case 'i': {
                  event.preventDefault()
                  toggleItalicMark(editor)
                  break
                }
              }
            }}
          />
        </Slate>
      </div>
    </div>
  )
}

const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
]

export default App;
