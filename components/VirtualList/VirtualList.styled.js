import styled, { css } from "styled-components"

export const VirtualList = styled("div").withConfig({
  shouldForwardProp: props => !/(width|height)/.test(props)
})`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow-y: scroll;
`

export const VirtualListContainer = styled("div").withConfig({
  shouldForwardProp: props => !/(height)/.test(props)
})`
  height: ${({ height }) => height};
`

export const VirtualListItem = styled("div").withConfig({
  shouldForwardProp: props => !/(height|position)/.test(props)
})`
  height: ${({ height }) => height};
  ${({ position }) => css`transform: translateY(${position})`};
`