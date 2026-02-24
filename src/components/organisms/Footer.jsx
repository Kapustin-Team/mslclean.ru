'use client'

import Link from 'next/link'
import { Logo, Container } from '../atoms'
import styles from './Footer.module.css'

const FOOTER_LINKS = {
  services: [
    { href: '#', label: 'Для ресторанов' },
    { href: '#', label: 'Для фитнес-клубов' },
    { href: '#', label: 'Для сетевых бизнесов' },
  ],
  company: [
    { href: '#', label: 'О нас' },
    { href: '#', label: 'Клиенты' },
    { href: '#', label: 'Вакансии' },
  ],
  contacts: [
    { href: 'tel:+79661155450', label: '+7 (966) 115-54-50' },
    { href: 'https://t.me/MSLClean', label: '@MSLClean (Telegram)' },
    { href: 'mailto:info@mslclean.ru', label: 'info@mslclean.ru' },
    { href: '#', label: 'Москва, ул. Примерная, 1' },
  ],
}

/**
 * Организм: Footer
 * Подвал сайта
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.description}>
            Аутстафинг клинингового персонала с гарантией качества, 
            контролем и заменой. Фиксированная цена, договор, безналичная оплата.
          </p>
        </div>
        
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Услуги</h4>
          <ul className={styles.links}>
            {FOOTER_LINKS.services.map(link => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Компания</h4>
          <ul className={styles.links}>
            {FOOTER_LINKS.company.map(link => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Контакты</h4>
          <ul className={styles.links}>
            {FOOTER_LINKS.contacts.map(link => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      
      <Container>
        <div className={styles.bottom}>
          © {new Date().getFullYear()} MSL Clean. Все права защищены.
        </div>
      </Container>
    </footer>
  )
}
