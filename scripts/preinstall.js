if (!/pnpm[^\/\\]*$/.test(process.env.npm_execpath || "")) {
  console.warn(`\u001b[33m
  Using package manager: ${process.env.npm_execpath}
  Please use pnpm instead.
  \u001b[39m`)
  process.exit(1)
}
