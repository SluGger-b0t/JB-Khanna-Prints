import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6oyttiv3', // ✅ Replace with your actual project ID if different
    dataset: 'jb_prints', // ✅ Replace with your dataset name
  },
  studioHost: 'jbkhannaprints',
})
