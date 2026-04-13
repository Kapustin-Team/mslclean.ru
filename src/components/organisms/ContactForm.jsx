'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button, Input, Textarea } from '../atoms'
import styles from './ContactForm.module.css'

/**
 * Организм: ContactForm
 * Форма обратной связи
 */
export default function ContactForm({ className = '', variant = 'default' }) {
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

  const isDetailed = variant === 'detailed'

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
      {!isDetailed && <h3 className={styles.title}>Получить бесплатный расчёт</h3>}
      
      <div className={styles.fields}>
        {isDetailed ? (
          <>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Ваше имя</label>
              <Input name="name" placeholder="Имя" required />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Компания</label>
              <Input name="company" placeholder="Название компании" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Телефон *</label>
              <Input name="phone" type="tel" placeholder="+7 (999) 999-99-99" required />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <Input name="email" type="email" placeholder="info@company.ru" />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Расскажите о вашем объекте</label>
              <Textarea name="message" placeholder="Тип объекта, площадь, количество персонала..." rows={4} />
            </div>
          </>
        ) : (
          <>
            <Input name="name" placeholder="Ваше имя" required />
            <Input name="phone" type="tel" placeholder="Телефон" required />
            <Input name="email" type="email" placeholder="Email" />
            <Textarea name="message" placeholder="Опишите вашу задачу" />
          </>
        )}
      </div>

      {isDetailed && (
        <label className={styles.checkbox}>
          <input type="checkbox" required />
          <span>
            Я согласен с <Link href="/privacy-policy" className={styles.checkboxLink}>Политикой обработки персональных данных</Link>
          </span>
        </label>
      )}
      
      <Button 
        type="submit" 
        variant="secondary"
        className={isDetailed ? styles.submitButton : ''}
        fullWidth 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : isDetailed ? 'Получить расчёт' : 'Отправить заявку'}
      </Button>
      
    </form>
  )
}
