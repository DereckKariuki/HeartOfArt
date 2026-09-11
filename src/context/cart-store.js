import { createContext, useContext } from 'react'

/**
 * The context object and its reader live here rather than beside the
 * provider component, so the provider file exports only a component and
 * hot reload keeps working during development.
 */
export const CartContext = createContext(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside a CartProvider')
  return context
}
