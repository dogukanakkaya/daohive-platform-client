'use client'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import './styles.css'
import React from 'react'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import * as commands from '@uiw/react-md-editor/lib/commands'
import { MDEditorProps } from '@uiw/react-md-editor'
import LoadingOverlay from '../LoadingOverlay'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] relative rounded-lg dark:bg-gray-800">
      <LoadingOverlay className="rounded-lg" />
    </div>
  )
})

export default function Editor({ ...props }: MDEditorProps) {
  return (
    <MDEditor
      {...props}
      className="daohive-editor"
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]]
      }}
      commands={[
        {
          ...commands.title1,
          icon: <i className="bi bi-type-h1 text-xl"></i>
        },
        {
          ...commands.title2,
          icon: <i className="bi bi-type-h2 text-xl"></i>
        },
        {
          ...commands.title3,
          icon: <i className="bi bi-type-h3 text-xl"></i>
        },
        commands.divider,
        {
          ...commands.bold,
          icon: <i className="bi bi-type-bold text-xl"></i>
        },
        {
          ...commands.italic,
          icon: <i className="bi bi-type-italic text-xl"></i>
        },
        {
          ...commands.strikethrough,
          icon: <i className="bi bi-type-strikethrough text-xl"></i>
        },
        {
          ...commands.hr,
          icon: <i className="bi bi-hr text-xl"></i>
        },
        commands.divider,
        {
          ...commands.link,
          icon: <i className="bi bi-link text-xl"></i>
        },
        {
          ...commands.quote,
          icon: <i className="bi bi-quote text-xl"></i>
        },
        commands.divider,
        {
          ...commands.orderedListCommand,
          icon: <i className="bi bi-list-ol text-xl"></i>
        },
        {
          ...commands.unorderedListCommand,
          icon: <i className="bi bi-list-ul text-xl"></i>
        },
        {
          ...commands.checkedListCommand,
          icon: <i className="bi bi-list-check text-xl"></i>
        },
        commands.divider,
        {
          ...commands.image,
          icon: <i className="bi bi-image text-xl"></i>
        },
        commands.divider,
        {
          ...commands.code,
          icon: <i className="bi bi-code text-xl"></i>
        },
        {
          ...commands.codeBlock,
          icon: <i className="bi bi-code-square text-xl"></i>
        }
      ]}
      extraCommands={[
        {
          name: 'help',
          keyCommand: 'help',
          buttonProps: { 'aria-label': 'Get help' },
          icon: <i className="bi bi-question-circle text-xl"></i>,
          execute: () => window.open('https://www.markdownguide.org/basic-syntax/', '_blank')
        },
        commands.divider,
        {
          ...commands.codeEdit,
          icon: <i className="bi bi-pencil-square text-xl"></i>
        },
        {
          ...commands.codePreview,
          icon: <i className="bi bi-eye text-xl"></i>
        },
        {
          ...commands.codeLive,
          icon: <i className="bi bi-square-half text-xl"></i>
        },
        commands.divider,
        {
          ...commands.fullscreen,
          icon: <i className="bi bi-fullscreen text-xl"></i>
        }
      ]}
    />
  )
}