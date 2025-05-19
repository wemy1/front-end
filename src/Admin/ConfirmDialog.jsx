"use client"

export default function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <p className="modal-description">{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>
            {cancelLabel || "Annuler"}
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            {confirmLabel || "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  )
}