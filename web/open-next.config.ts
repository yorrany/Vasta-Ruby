import type { OpenNextConfig } from 'open-next/types/open-next'

const config = {
  dangerous: {
    disableFontManifest: true,
    enableCacheInterception: false,
  },
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },

  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
    },
  },

  unsupported: {
    // Disable file system access for font manifest causing readFileSync error
    // This forces Next.js to inline font usage or skip manifest loading at runtime
  }
};

export default config;
