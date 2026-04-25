import { X, Minus, Plus, BadgeCheck, Landmark } from "lucide-react";
import type { Product } from "../data/products";

type CartLine = { product: Product; quantity: number };

export function CartDrawer({ open, lines, onClose, onAdd, onRemove, onCheckout }: { open: boolean; lines: CartLine[]; onClose: () => void; onAdd: (id: string) => void; onRemove: (id: string) => void; onCheckout: () => void }) {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal >= 250 || subtotal === 0 ? 0 : 12;
  return (
    <aside className={`cart-panel ${open ? "cart-open" : ""}`} aria-hidden={!open}>
      <div className="cart-head">
        <div>
          <p className="eyebrow">Secure bag</p>
          <h2>Your Elyra ritual</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={20} /></button>
      </div>
      {lines.length === 0 ? (
        <div className="empty-cart">Your bag is ready for a new ritual.</div>
      ) : (
        <div className="cart-lines">
          {lines.map((line) => (
            <div className="cart-line" key={line.product.id}>
              <div className="cart-thumb">{line.product.name.slice(0, 1)}</div>
              <div>
                <strong>{line.product.name}</strong>
                <p>{line.product.category}</p>
                <div className="qty-row">
                  <button onClick={() => onRemove(line.product.id)} aria-label="Decrease quantity"><Minus size={14} /></button>
                  <span>{line.quantity}</span>
                  <button onClick={() => onAdd(line.product.id)} aria-label="Increase quantity"><Plus size={14} /></button>
                </div>
              </div>
              <b>${line.product.price * line.quantity}</b>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <div className="trust-note"><BadgeCheck size={18} /> Encrypted checkout structure prepared for Stripe and PayPal.</div>
        <div className="total-row"><span>Subtotal</span><strong>${subtotal}</strong></div>
        <div className="total-row muted-total"><span>Estimated shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong></div>
        <button className="primary-action" disabled={!lines.length} onClick={onCheckout}><Landmark size={18} /> Continue to secure checkout</button>
      </div>
    </aside>
  );
}
