import React, { useEffect, useMemo, useState, useCallback } from 'react';
import{ 
        MdCode, 
        MdFormatBold,
        MdFormatItalic, 
        MdFormatUnderlined, 
        MdFormatQuote, 
        MdLooksOne, 
        MdLooksTwo, 
        MdFormatListBulleted, 
        MdFormatListNumbered 
      } from 'react-icons/md';

import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import './App.css';

import{ 
        toggleCodeBlock, 
        toggleItalicMark, 
        toggleBoldMark, 
        toggleUnderlineMark,
        toggleQuoteBlock, 
        toggleHeadingOne, 
        toggleHeadingTwo,
        toggleListItem,
        toggleNumberedList 
      } from './helpers/customEditor'



const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('content'))
    || '' || initialValue
  )

  const renderElement = useCallback(props => <Element {...props} />, [])

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
              <MdFormatUnderlined
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer'}}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleUnderlineMark(editor)
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
              <MdFormatQuote
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleQuoteBlock(editor)
                }}
              />
              <MdLooksOne
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleHeadingOne(editor)
                }}
              />
              <MdLooksTwo
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleHeadingTwo(editor)
                }}
              />
              <MdFormatListNumbered
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleNumberedList(editor)
                }}
              />
              <MdFormatListBulleted
                size={30}
                style={{color: '#999', margin: '0 10px', cursor: 'pointer' }}
                onMouseDown={event => {
                  event.preventDefault()
                  toggleListItem(editor)
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

                case 'u': {
                  event.preventDefault()
                  toggleUnderlineMark(editor)
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

const Element = props => {
  switch (props.element.type) {
    case 'code':
      return  (
        <pre {...props.attributes}>
          <code 
                  style={
                    {
                      background: '#f0f0f0', 
                      padding: '5px',
                      borderLeft: 'solid 4px #509ef1'
                    }
                  }
                >
                  {props.children}
          </code>
        </pre>  
      )
    
    case 'block-quote':
      return (
        <pre {...props.attributes}>
          <blockquote 
            style={
              {
                color: '#999',
                fontSize: '14px',
                fontStyle: 'italic',
                borderLeft: 'solid 2px #999', 
                padding: '5px'
              }
            } 
          >
            {props.children}
          </blockquote>
        </pre>
      )

    case 'heading-one':
      return <h1 {...props.attributes}>{props.children}</h1>

    case 'heading-two':
      return <h2 {...props.attributes}>{props.children}</h2>

    case 'list-item':
      return <li {...props.attributes}>{props.children}</li>
      
    case 'numbered-list':
      return (
        <ol>
          <li {...props.attributes}>{props.children}</li>
        </ol>
       
      )
      
    
    default:
      return <p style={{padding: '5px 0'}} {...props.attributes}>{props.children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
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
