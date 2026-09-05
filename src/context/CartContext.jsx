import { useCallback, useMemo, useState } from 'react'
import { CartContext } from './cart-store'

/**
 * Cart state lives in React for the session only — no localStorage,
 * no sessionStorage. It survives navigation between routes because the
 * provider sits above the router outlet.
 *
 * A line is identified by product + size + framing, so the same print in
 * two sizes is two lines. Originals are one of one and cap at quantity 1.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((line) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === line.id)
      if (!existing) return [...current, { ...line, quantity: line.quantity ?? 1 }]
      const max = existing.maxQuantity ?? Infinity
      return current.map((item) =>
        item.id === line.id
          ? { ...item, quantity: Math.min(item.quantity + (line.quantity ?? 1), max) }
          : item,
      )
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const setQuantity = useCallback((id, quantity) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item]
        const max = item.maxQuantity ?? 99
        const next = Math.min(Math.max(quantity, 0), max)
        return next < 1 ? [] : [{ ...item, quantity: next }]
      }),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  )

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const hasProduct = useCallback(
    (productId) => items.some((item) => item.productId === productId),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      hasProduct,
    }),
    [
      items,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      hasProduct,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
