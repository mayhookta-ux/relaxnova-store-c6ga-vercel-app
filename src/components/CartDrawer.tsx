import { X, Minus, Plus, ShieldCheck, CreditCard } from "lucide-react";
import type { Product } from "../data/products";

type CartLine = { product: Product; quantity: number };

export function CartDrawer({ open, lines, onClose, onAdd, onRemove, onCheckout }: { open: boolean; lines: CartLine[]; onClose: () => void; onAdd: (id: string) => void; onRemove: (id: string) => void; onCheckout: () => void }) {
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const shipping = subtotal === 0 ? 0 : 12;
  return (
    <aside className={`cart-panel ${open ? "cart-open" : ""}`} aria-hidden={!open}>
      <div className="cart-head">
        <div>
          <p className="eyebrow">Secure cart</p>
          <h2>Your order</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close cart"><X size={20} /></button>
      </div>
      {lines.length === 0 ? (
        <div className="empty-cart">Your Smart Posture Corrector cart is ready.</div>
      ) : (
        <div className="cart-lines">
          {lines.map((line) => (
            <div className="cart-line" key={line.product.id}>
              <img className="cart-thumb" src={line.product.image} alt={`${line.product.name} thumbnail`} width={80} height={80} loading="lazy" />
              <div>
                <strong>{line.product.name}</strong>
                <p>{line.product.category}</p>
                <div className="qty-row">
                  <button onClick={() => onRemove(line.product.id)} aria-label="Decrease quantity"><Minus size={14} /></button>
                  <span>{line.quantity}</span>
                  <button onClick={() => onAdd(line.product.id)} aria-label="Increase quantity"><Plus size={14} /></button>
                </div>
              </div>
               <b>${(line.product.price * line.quantity).toFixed(2)}</b>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <div className="trust-note"><ShieldCheck size={18} /> Secure checkout · CJ fulfillment · 7–12 business day US delivery estimate.</div>
        <div className="total-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div className="total-row muted-total"><span>Estimated shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></div>
        <button className="primary-action" disabled={!lines.length} onClick={onCheckout}><CreditCard size={18} /> Continue to checkout</button>
      </div>
    </aside>
  );
}
