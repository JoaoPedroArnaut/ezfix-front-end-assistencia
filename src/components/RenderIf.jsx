import React from 'react'

const RenderIf = ({children, condition}) => {
  return condition ? children: null
}

export default RenderIf