/// <reference types="@rsbuild/core/types" />

declare module "*.md" {
  import type { MDXContent } from "mdx/types"

  const MDXComponent: MDXContent
  export default MDXComponent
}

declare module "*.mdx" {
  import type { MDXContent } from "mdx/types"

  const MDXComponent: MDXContent
  export default MDXComponent
}
