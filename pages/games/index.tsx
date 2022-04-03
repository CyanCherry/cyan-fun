import type { NextPage } from "next"

const Games: NextPage = ({ children }) => {
  return (
    <div>
      Games
      <div>{children}</div>
    </div>
  )
}

export default Games
