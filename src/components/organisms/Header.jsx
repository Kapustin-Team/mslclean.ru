'use client'

import { Logo, Button, Container } from '../atoms'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#problems', label: 'Проблемы' },
  { href: '#solution', label: 'Решение' },
  { href: '#usp', label: 'Преимущества' },
  { href: '#how-it-works', label: 'Как работаем' },
  { href: '#contact', label: 'Контакты' },
]

/**
 * Организм: Header
 * Шапка сайта с навигацией
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Logo />
        
        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className={styles.right}>
          <div className={styles.phone}>
            <a href="tel:+79661155450" className={styles.phoneNumber}>
              +7 (966) 115-54-50
            </a>
            <span className={styles.phoneHint}>Работаем с 8:00 до 23:00</span>
          </div>
          <Button href="#contact" size="sm">
            Получить расчёт
          </Button>
        </div>
      </Container>
    </header>
  )
}
