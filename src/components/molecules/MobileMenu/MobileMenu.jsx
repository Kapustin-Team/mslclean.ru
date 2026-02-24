'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MobileMenu.module.css'

const NAV_ITEMS = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Клиенты' },
  { href: '#contact', label: 'Контакты' },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Stagger для элементов
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  }

  // Маска — текст выезжает снизу вверх
  const maskVariants = {
    hidden: { y: '100%' },
    visible: { 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      y: '100%',
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <>
      {/* Бургер / Крестик */}
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
      >
        <div className={`${styles.menuIcon} ${isOpen ? styles.open : ''}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      {/* Fullscreen меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.2 } }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              className={styles.nav}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_ITEMS.map((item, i) => (
                <div key={item.href} className={styles.linkWrapper}>
                  <motion.a
                    href={item.href}
                    className={styles.link}
                    variants={maskVariants}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </motion.a>
                </div>
              ))}
              
              <div className={styles.linkWrapper}>
                <motion.a
                  href="#contact"
                  className={styles.cta}
                  variants={maskVariants}
                  onClick={closeMenu}
                >
                  Получить расчёт
                </motion.a>
              </div>
            </motion.nav>

            <motion.div 
              className={styles.footer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href="tel:+79661155450">+7 (966) 115-54-50</a>
              <span>Ежедневно 8:00–23:00</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
