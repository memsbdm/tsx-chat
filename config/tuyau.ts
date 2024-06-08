import { defineConfig } from '@tuyau/core'

const tuyauConfig = defineConfig({
  codegen: {
    /**
     * List of routes to ignore during code generation
     */
    // @ts-ignore
    ignoreRoutes: [],
  },
})

export default tuyauConfig
