import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  VirtualList as VirtualListComponent,
  VirtualListItem as VirtualListItemComponent,
  VirtualListContainer
} from "./VirtualList.styled"

export default function VirtualList({
  children = () => {},
  items = [],
  itemHeight = 30,
  visible = 15,
  totalItem = 0,
  offsetItem = 2,
  width = "fit-content",
  itemKey = "name",
  height = "300px"
}) {
  const [position, setPosition] = useState(0)
  const [visibleIndex, setVisibleIndex] = useState({ start: 0, end: visible + offsetItem })

  const visibleItems = useMemo(() => items.slice(visibleIndex.start, visibleIndex.end), [items, visibleIndex])
  
  const virtualListRef = useRef(null)

  const handleContainerScroll = useCallback((e) => {
    const el = e.target
    const start = Math.max(0, Math.ceil(el.scrollTop / itemHeight) - offsetItem)
    const end = visible + (start >= 0 ? start : 0)

    setPosition(el.scrollTop)
    setVisibleIndex({ start: start >= 0 ? start : 0, end })
  }, [itemHeight, offsetItem, visible])
  
  useLayoutEffect(() => {
    if (!virtualListRef.current) return

    const container = virtualListRef.current

    container.addEventListener("scroll", handleContainerScroll)

    return () => container.removeEventListener("scroll", handleContainerScroll)
  }, [items, handleContainerScroll])
  
  return (
    <VirtualListComponent ref={virtualListRef} width={width} height={height}>
      <VirtualListContainer height={`${itemHeight * totalItem}px`}>
        {visibleItems.map((item) => (
          <VirtualListItem height={itemHeight} position={position} key={item[itemKey]}>
            {children({ item })}
          </VirtualListItem>
        ))}
      </VirtualListContainer>
    </VirtualListComponent>
  )
}

function VirtualListItem({ height, position, children }) {
  return (
    <VirtualListItemComponent position={`${position}px`} height={`${height}px`}>
      {children}
    </VirtualListItemComponent>
  )
}
