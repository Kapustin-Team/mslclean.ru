'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'
import styles from './ContactModal.module.css'

export default function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button className={styles.closeButton} onClick={onClose} aria-label="Закрыть форму">
          <X size={20} />
        </button>

        <div className={styles.content}>
          <div className={styles.copy}>
            <h2 id="contact-modal-title" className={styles.title}>Давайте составим план действий</h2>
            <p className={styles.text}>Оставьте заявку, и мы свяжемся с вами в течение 10 минут.</p>
          </div>

          <ContactForm className={styles.formWrap} />
        </div>
      </div>
    </div>
  )
}
