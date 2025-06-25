import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { structure } from './structure'
import { schema } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'JB Khanna Prints',
  projectId: '6oyttiv3',
  dataset: 'jb_prints',
  schema,
  plugins: [
    deskTool(),
    visionTool({ defaultApiVersion: '2025-06-03' }),
    structureTool({ structure }),
  ],
})
