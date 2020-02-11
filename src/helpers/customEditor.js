import { Editor, Transforms, Text } from 'slate';

  function isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  }

  function isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  }

  function isQuoteBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'block-quote',
    })

    return !!match
  }

  function isHeadingOneActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'heading-one',
    })

    return !!match
  }

  function isHeadingTwoActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'heading-two',
    })

    return !!match
  }
  
  function isNumberedListActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'numbered-list',
    })

    return !!match
  }

  function isListItemActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'list-item',
    })

    return !!match
  }

  function isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    })

    return !!match
  }

  function isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.underline === true,
      universal: true,
    })

    return !!match
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  export function toggleBoldMark(editor) {
    const isActive = isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  }

  export function toggleCodeBlock(editor) {
    const isActive = isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  export function toggleQuoteBlock(editor) {
    const isActive = isQuoteBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'block-quote' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
  
  export function toggleHeadingOne(editor) {
    const isActive = isHeadingOneActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'heading-one' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  export function toggleHeadingTwo(editor) {
    const isActive = isHeadingTwoActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'heading-two' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  export function toggleNumberedList(editor) {
    const isActive = isNumberedListActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'numbered-list' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  export function toggleListItem(editor) {
    const isActive = isListItemActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'list-item' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }

  export function toggleItalicMark(editor) {
    const isActive = isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  }

  export function toggleUnderlineMark(editor) {
    const isActive = isUnderlineMarkActive(editor)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  }

