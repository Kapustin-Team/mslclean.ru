'use client'

import { useState } from 'react'
import { Button, Input, Textarea } from '../atoms'
import styles from './ContactForm.module.css'

/**
 * Организм: ContactForm
 * Форма обратной связи
 */
export default function ContactForm({ className = '' }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // TODO: Интеграция с API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3>Заявка отправлена!</h3>
        <p>Мы свяжемся с вами в течение 10 минут</p>
      </div>
    )
  }

  return (
    <form className={[styles.form, className].filter(Boolean).join(' ')} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Получить бесплатный расчёт</h3>
      
      <div className={styles.fields}>
        <Input 
          name="name"
          placeholder="Ваше имя" 
          required 
        />
        <Input 
          name="phone"
          type="tel"
          placeholder="Телефон" 
          required 
        />
        <Input 
          name="email"
          type="email"
          placeholder="Email" 
        />
        <Textarea 
          name="message"
          placeholder="Опишите вашу задачу" 
        />
      </div>
      
      <Button 
        type="submit" 
        variant="secondary"
        fullWidth 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </Button>
      
    </form>
  )
}
