import { createContext, useContext, useReducer } from 'react'
import { DEFAULT_MENU, LOYALTY_TIERS } from '../data/data.js'

const StoreContext = createContext(null)

// quick localStorage wrappers — nothing fancy
function load(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
}

const initialState = {
  menu:         load('hs-menu',    DEFAULT_MENU),
  cart:         [],
  orderType:    'pickup',
  note:         '',
  loyalty:      load('hs-loyalty', { pts: 0, total: 0, orders: 0, history: [] }),
  cartOpen:     false,
  announce:     'Now booking summer catering events! Call (289) 980-0149.',
  announceOn:   true,
  storeOpen:    true,
  toasts:       [],
  wishlist:     load('hs-wish',    []),
  recentOrders: load('hs-orders',  []),
}

function reducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const updated = [...state.menu, action.item]
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'REMOVE_ITEM': {
      const updated = state.menu.filter(item => item.id !== action.id)
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'TOGGLE_AVAIL': {
      const updated = state.menu.map(item =>
        item.id === action.id ? { ...item, available: !item.available } : item
      )
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'TOGGLE_FEAT': {
      const updated = state.menu.map(item =>
        item.id === action.id ? { ...item, featured: !item.featured } : item
      )
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'UPDATE_PRICE': {
      const updated = state.menu.map(item =>
        item.id === action.id ? { ...item, price: parseFloat(action.price) } : item
      )
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'UPDATE_IMAGE': {
      const updated = state.menu.map(item =>
        item.id === action.id ? { ...item, image: action.image } : item
      )
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'REMOVE_IMAGE': {
      const updated = state.menu.map(item =>
        item.id === action.id ? { ...item, image: null } : item
      )
      save('hs-menu', updated)
      return { ...state, menu: updated }
    }

    case 'RESET_MENU': {
      save('hs-menu', DEFAULT_MENU)
      return { ...state, menu: DEFAULT_MENU }
    }

    // cart stuff
    case 'CART_ADD': {
      const exists = state.cart.find(item => item.id === action.item.id)
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.item.id ? { ...item, qty: item.qty + 1 } : item
          )
        }
      }
      return { ...state, cart: [...state.cart, { ...action.item, qty: 1 }] }
    }

    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter(item => item.id !== action.id) }

    case 'CART_QTY':
      return {
        ...state,
        cart: action.qty <= 0
          ? state.cart.filter(item => item.id !== action.id)
          : state.cart.map(item => item.id === action.id ? { ...item, qty: action.qty } : item)
      }

    case 'CART_CLEAR':
      return { ...state, cart: [] }

    case 'SET_NOTE':
      return { ...state, note: action.note }

    case 'SET_ORDER_TYPE':
      return { ...state, orderType: action.orderType }

    case 'COMPLETE_ORDER': {
      const pointsEarned = Math.floor(action.total * 10)
      const newLoyalty = {
        pts:     state.loyalty.pts + pointsEarned,
        total:   state.loyalty.total + pointsEarned,
        orders:  state.loyalty.orders + 1,
        history: [
          { date: new Date().toLocaleDateString(), total: action.total, pts: pointsEarned },
          ...state.loyalty.history.slice(0, 29)
        ]
      }
      const newOrders = [
        { id: action.oid, date: new Date().toLocaleDateString(), total: action.total, items: action.items, status: 'confirmed' },
        ...state.recentOrders.slice(0, 9)
      ]
      save('hs-loyalty', newLoyalty)
      save('hs-orders',  newOrders)
      return { ...state, loyalty: newLoyalty, cart: [], recentOrders: newOrders }
    }

    case 'CART_OPEN':
      return { ...state, cartOpen: action.open }

    case 'SET_ANNOUNCE':
      return { ...state, announce: action.text }

    case 'TOGGLE_ANNOUNCE':
      return { ...state, announceOn: !state.announceOn }

    case 'TOGGLE_STORE':
      return { ...state, storeOpen: !state.storeOpen }

    case 'TOGGLE_WISH': {
      const newList = state.wishlist.includes(action.id)
        ? state.wishlist.filter(id => id !== action.id)
        : [...state.wishlist, action.id]
      save('hs-wish', newList)
      return { ...state, wishlist: newList }
    }

    case 'TOAST_ADD':
      return { ...state, toasts: [...state.toasts, { id: action.id, msg: action.msg, kind: action.kind }] }

    case 'TOAST_REMOVE':
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.id) }

    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function toast(msg, kind = 'success', duration = 3200) {
    const id = Date.now() + Math.random()
    dispatch({ type: 'TOAST_ADD', id, msg, kind })
    setTimeout(() => dispatch({ type: 'TOAST_REMOVE', id }), duration)
  }

  const subtotal  = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax       = subtotal * 0.13
  const total     = subtotal + tax
  const itemCount = state.cart.reduce((sum, item) => sum + item.qty, 0)

  // figure out which loyalty tier the user is in
  const loyaltyTier = state.loyalty.total >= 1000 ? 3
                    : state.loyalty.total >= 500  ? 2
                    : state.loyalty.total >= 200  ? 1
                    : 0

  function completeOrder() {
    const orderId = 'HS-' + Date.now().toString(36).toUpperCase()
    const items   = [...state.cart]
    dispatch({ type: 'COMPLETE_ORDER', total, oid: orderId, items })
    return { oid: orderId, total, items, pts: Math.floor(total * 10), orderType: state.orderType }
  }

  const isWished = id => state.wishlist.includes(id)

  return (
    <StoreContext.Provider value={{ state, dispatch, toast, subtotal, tax, total, itemCount, loyaltyTier, completeOrder, isWished }}>
      {children}

      {/* toast notifications */}
      <div style={{ position: 'fixed', bottom: 68, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none', maxWidth: 300 }}>
        {state.toasts.map(t => (
          <div
            key={t.id}
            className={`toast toast-${t.kind}`}
            style={{ pointerEvents: 'all' }}
            onClick={() => dispatch({ type: 'TOAST_REMOVE', id: t.id })}
          >
            {t.kind === 'fire' ? '🔥' : t.kind === 'error' ? '✕' : '✓'} {t.msg}
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
