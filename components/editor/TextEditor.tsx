'use client'
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState, useEffect, useRef } from 'react'

export default function TextEditor() {
  // const [cliente, setCliente] = useState(false)
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, Editor }: any = editorRef.current || {}
  const editorSetup: any = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
      ],
      shouldNotGroupWhenFull: true
    },
    // language: 'es-co',
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22, 25, 30, 35, 40],
      supportAllValues: true
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    },
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    // htmlSupport: {
    //   allow: [
    //     {
    //       name: /.*/,
    //       attributes: true,
    //       classes: true,
    //       styles: true
    //     }
    //   ]
    // },
    // htmlEmbed: {
    //   showPreviews: true
    // },
    // link: {
    //   decorators: {
    //     addTargetToExternalLinks: true,
    //     defaultProtocol: 'https://',
    //     toggleDownloadable: {
    //       mode: 'manual',
    //       label: 'Downloadable',
    //       attributes: {
    //         download: 'file'
    //       }
    //     }
    //   }
    // },
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
      ],
      supportAllValues: true
    },
    // removePlugins: [
    //   'CKBox',
    //   'CKFinder',
    //   'EasyImage',
    //   'RealTimeCollaborativeComments',
    //   'RealTimeCollaborativeTrackChanges',
    //   'RealTimeCollaborativeRevisionHistory',
    //   'PresenceList',
    //   'Comments',
    //   'TrackChanges',
    //   'TrackChangesData',
    //   'RevisionHistory',
    //   'Pagination',
    //   'WProofreader',
    //   'MathType',
    //   'SlashCommand',
    //   'Template',
    //   'DocumentOutline',
    //   'FormatPainter',
    //   'TableOfContents'
    // ]
  }
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      Editor: require('ckeditor5-custom-build/build/ckeditor'),
    } as any
    setEditorLoaded(true)
    console.log(Editor)
  }, [Editor])
  return (
    <>
      {editorLoaded ? <CKEditor
        editor={Editor}
        config={editorSetup}
        onChange={(e: any, editor: any) => {
          const data = editor.getData()
          console.log(data)
        }}
      /> : 'Cargando editor...'}
    </>
  )
}
