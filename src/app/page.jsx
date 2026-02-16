'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { 
  Dumbbell, 
  CheckCircle, 
  Wallet, 
  Zap, 
  FileText, 
  Eye,
  Gift
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './page.module.css'
import { MobileMenu } from '@/components/molecules'
import { Logo } from '@/components/atoms'
import { SplitText, AnimatedTag } from '@/components/atoms'
import CookieBanner from '@/components/organisms/CookieBanner'

// Анимация для карточек — fade + slide up
const CardReveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
)

// Контент из ТЗ
const PROBLEMS = [
  {
    num: 1,
    title: 'Текучка персонала',
    items: [
      'Клинер не пришел на работу',
      'Потеря репутации, потеря клиентов',
      'Дорогостоящая непредвиденная замена',
    ],
  },
  {
    num: 2,
    title: 'Поиск и обучение',
    items: [
      'Ищете клинера месяц через знакомых и Авито',
      'Переплачиваете наличными',
      'Нет гарантий на качество',
    ],
  },
  {
    num: 3,
    title: 'Управление персоналом',
    items: [
      'Вы не кадровик, но должны следить за графиком',
      'Больничные, отпуска, конфликты',
      'Налоги, ПФР, документы — ваша задача',
    ],
  },
  {
    num: 4,
    title: 'Стандарты качества',
    items: [
      'Ваш клинер — ваша ответственность',
      'Если что-то сломал или потерял — вам платить',
      'Нет контроля качества',
    ],
  },
]

const SOLUTIONS = [
  {
    num: 1,
    title: 'Готовый персонал 24/7',
    desc: 'Мы подбираем персонал по 7 параметрам: опыт, документы, навыки, рекомендации, адаптивность, устойчивость к нагрузкам, ответственность',
    highlight: 'Готовый сотрудник за 24-48 часов',
    image: '/images/solution-staff.png',
  },
  {
    num: 2,
    title: 'Замена без остановки',
    desc: 'Заболел — мы пришлем замену той же смены. Контроль 24/7.',
    highlight: 'Гарантия непрерывности работы',
    image: '/images/solution-replacement.png',
  },
  {
    num: 3,
    title: 'Юридическое оформление',
    desc: 'Договор, безналичная оплата, фиксированная цена. Вы не отвечаете перед законом за клинера — мы отвечаем.',
    highlight: 'Экономия на ФОТ, налогах, ПФР',
    image: '/images/solution-legal.png',
  },
  {
    num: 4,
    title: 'Контроль качества',
    desc: 'Каждый объект сопровождает менеджер. Если не нравится — замена в течение дня.',
    highlight: 'Персональный менеджер объекта',
    image: '/images/solution-quality.png',
  },
]

const USP = [
  {
    Icon: Dumbbell,
    title: 'Специалист по фитнес-клубам и ресторанам',
    desc: 'Мы работаем с вашей индустрией 3+ года, понимаем специфику',
  },
  {
    Icon: CheckCircle,
    title: 'Гарантия качества',
    desc: 'Если персонал не подходит — замена в течение дня, без доплаты',
  },
  {
    Icon: Wallet,
    title: 'Фиксированная цена',
    desc: 'Никаких скрытых платежей, никаких наличных расчетов',
  },
  {
    Icon: Zap,
    title: 'Быстрый подбор',
    desc: 'Готовый персонал за 24-48 часов, замена — за 2 часа',
  },
  {
    Icon: FileText,
    title: 'Полная юридическая поддержка',
    desc: 'Договор, налоги, ПФР, страховка — все на нас',
  },
  {
    Icon: Eye,
    title: 'Контроль 24/7',
    desc: 'Менеджер отвечает за каждый объект, контроль качества в режиме реального времени',
  },
]

const STEPS = [
  {
    num: 1,
    title: 'Анализ задачи',
    desc: 'Изучаем объект, требования и процессы',
  },
  {
    num: 2,
    title: 'Подбор персонала',
    desc: 'Формируем команду под конкретные задачи',
  },
  {
    num: 3,
    title: 'Запуск работы',
    desc: 'Выводим персонал на объект, контролируем качество',
  },
  {
    num: 4,
    title: 'Сопровождение',
    desc: 'Менеджер на связи 24/7, решаем все вопросы',
  },
]

const PORTFOLIO = [
  { title: 'Фитнес-клуб Premium', image: '/images/portfolio-gym.jpg' },
  { title: 'Ресторан Москва', image: '/images/portfolio-restaurant.jpg' },
  { title: 'Бизнес-центр Сити', image: '/images/portfolio-office.jpg' },
  { title: 'Сеть кафе Вкусно', image: '/images/portfolio-cafe.jpg' },
  { title: 'Отель Люкс', image: '/images/portfolio-hotel.jpg' },
]

export default function HomePage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageBody}>
        {/* ===================== NAVBAR ===================== */}
        <nav className={styles.navbar}>
          <div className={styles.navbarInner}>
<Logo />
            <div className={styles.navMenu}>
              <Link href="#about" className={styles.navLink}>О компании</Link>
              <Link href="#services" className={styles.navLink}>Услуги</Link>
              <Link href="#portfolio" className={styles.navLink}>Клиенты</Link>
              <Link href="#contact" className={styles.navLink}>Контакты</Link>
            </div>
            <div className={styles.navRight}>
              <div className={styles.navPhone}>
                <a href="tel:+79999999999">+7 (999) 999-99-99</a>
                <span className={styles.navPhoneHint}>Работаем 24/7</span>
              </div>
              <Link href="#contact" className={styles.navButton}>
                Получить расчёт
              </Link>
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* ===================== HERO ===================== */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            {/* Image Card */}
            <motion.div 
              className={styles.heroCard}
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <Image 
                src="/images/hero-bg.jpg"
                alt="Интерьер ресторана"
                fill
                priority
                className={styles.heroImage}
              />
              <div className={styles.heroOverlay} />
              
              {/* Title on image */}
              <h1 className={styles.heroTitle}>
                <SplitText as="span" delay={0.2}>Чистота.</SplitText>
                <br />
                <SplitText as="span" delay={0.4}>Без управленческих забот</SplitText>
              </h1>
              
              {/* Content box */}
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className={styles.heroText}>
                  Подбор, замены и контроль клинингового персонала под ключ. 
                  Наша команда экспертов обеспечит чистоту на вашем объекте.
                </p>
                <Link href="#contact" className={styles.heroButton}>
                  Связаться с нами
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section className={styles.aboutSection} id="about">
          <div className={styles.sectionPadding}>
            <div className={styles.aboutContent}>
              <AnimatedTag>Добро пожаловать в MSL Clean</AnimatedTag>
              <SplitText as="h2" className={styles.aboutTitle} delay={0.1}>
                Ваш надёжный партнёр в аутстафинге клинингового персонала
              </SplitText>
              <SplitText as="p" className={styles.aboutText} delay={0.3}>
                Мы берём на себя подбор, контроль и управление сотрудниками, обеспечивая стабильную чистоту на вашем объекте. Вы работаете, мы отвечаем за чистоту. Никаких звонков клинерам, никаких замен в спешке, никаких судебных проблем.
              </SplitText>
            </div>
          </div>
        </section>

        {/* ===================== BANNER ===================== */}
        <section className={styles.bannerSection}>
          <motion.div 
            className={styles.bannerBkg}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image 
              src="/images/banner-kitchen.jpg"
              alt="Команда клининга за работой в ресторане"
              fill
              className={styles.bannerImage}
            />
            <div className={styles.bannerOverlay} />
          </motion.div>
        </section>

        {/* ===================== PROBLEMS ===================== */}
        <section className={styles.problemsSection} id="problems">
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Знакомо?</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Вам знакомо это?</SplitText>
              <SplitText as="p" className={styles.sectionSubtitle} delay={0.2}>Это обходится вам дорого</SplitText>
            </div>

            <div className={styles.problemsGrid}>
              {PROBLEMS.map((problem, index) => (
                <CardReveal key={problem.num} delay={0.1 * index}>
                  <div className={styles.problemCard}>
                    <div className={styles.problemNum}>{problem.num}</div>
                    <h3 className={styles.problemTitle}>{problem.title}</h3>
                    <ul className={styles.problemList}>
                      {problem.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== SOLUTION ===================== */}
        <section className={styles.solutionSection} id="services">
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Решение</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Аутстафинг клинингового персонала</SplitText>
              <SplitText as="p" className={styles.sectionSubtitle} delay={0.2}>Мы берём всю ответственность на себя</SplitText>
            </div>

            <div className={styles.solutionGrid}>
              {SOLUTIONS.map((solution, index) => (
                <CardReveal key={solution.num} delay={index * 0.1}>
                  <div className={styles.solutionItem}>
                    <div className={styles.solutionImageWrapper}>
                      <Image 
                        src={solution.image}
                        alt={solution.title}
                        width={200}
                        height={200}
                        className={styles.solutionImage}
                      />
                    </div>
                    <div className={styles.solutionContent}>
                      <h3 className={styles.solutionTitle}>{solution.title}</h3>
                      <p className={styles.solutionDesc}>{solution.desc}</p>
                      <div className={styles.solutionHighlight}>{solution.highlight}</div>
                    </div>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== USP ===================== */}
        <section className={styles.uspSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Преимущества</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Почему выбирают нас</SplitText>
            </div>

            <div className={styles.uspGrid}>
              {USP.map((item, i) => {
                const IconComponent = item.Icon
                return (
                  <CardReveal key={i} delay={i * 0.05}>
                    <div className={styles.uspCard}>
                      <div className={styles.uspIcon}>
                        <IconComponent size={28} strokeWidth={1.5} />
                      </div>
                      <h3 className={styles.uspTitle}>{item.title}</h3>
                      <p className={styles.uspDesc}>{item.desc}</p>
                    </div>
                  </CardReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ===================== HOW IT WORKS ===================== */}
        <section className={styles.stepsSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Процесс</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Как это работает? Всего 4 шага</SplitText>
            </div>

            <div className={styles.stepsGrid}>
              {STEPS.map((step, index) => (
                <CardReveal key={step.num} delay={index * 0.1}>
                  <div className={styles.stepCard}>
                    <div className={styles.stepNum}>{step.num}</div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PORTFOLIO SLIDER ===================== */}
        <section className={styles.portfolioSection} id="portfolio">
          <div className={styles.sectionPadding}>
            <div className={styles.portfolioTop}>
              <div className={styles.portfolioInfo}>
                <AnimatedTag>Клиенты</AnimatedTag>
                <SplitText as="h2" delay={0.1}>Наши объекты и проекты</SplitText>
              </div>
              <div className={styles.sliderArrows}>
                <button className={`${styles.sliderArrow} swiper-prev`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12l14 0M5 12l6 6M5 12l6-6"/>
                  </svg>
                </button>
                <button className={`${styles.sliderArrow} swiper-next`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12l14 0M13 18l6-6M13 6l6 6"/>
                  </svg>
                </button>
              </div>
            </div>

            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView="auto"
              navigation={{
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
              }}
              className={styles.portfolioSlider}
            >
              {PORTFOLIO.map((item, index) => (
                <SwiperSlide key={index} className={styles.portfolioSlide}>
                  <motion.div 
                    className={styles.portfolioCard}
                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                    whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  >
                    <div className={styles.portfolioImageWrapper}>
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className={styles.portfolioImage}
                      />
                      <div className={styles.portfolioImageOverlay} />
                    </div>
                    <div className={styles.portfolioCardInfo}>
                      <h4>{item.title}</h4>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ===================== CONTACT ===================== */}
        <section className={styles.contactSection} id="contact">
          <div className={styles.contactBkg}>
            <div className={styles.contactGradient} />
          </div>
          <div className={styles.contactContent}>
            <div className={styles.sectionPadding}>
              <div className={styles.contactGrid}>
                <div className={styles.contactLeft}>
                  <div className={styles.tagWhite}>Связаться с нами</div>
                  <h2>Давайте обсудим<br/>ваш проект</h2>
                  <p>Ответим в течение 10 минут</p>
                  <div className={styles.contactInfo}>
                    <a href="tel:+79999999999" className={styles.contactPhone}>
                      +7 (999) 999-99-99
                    </a>
                    <span className={styles.contactHint}>Работаем 24/7</span>
                  </div>
                  <p className={styles.contactAlt}>Не любите звонить? Напишите на email</p>
                  <a href="mailto:info@mslclean.ru" className={styles.emailLink}>
                    info@mslclean.ru
                  </a>
                </div>
                <div className={styles.contactRight}>
                  <form className={styles.contactForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Ваше имя</label>
                        <input type="text" placeholder="Имя" required />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Компания</label>
                        <input type="text" placeholder="Название компании" />
                      </div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Телефон *</label>
                        <input type="tel" placeholder="+7 (999) 999-99-99" required />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" placeholder="info@company.ru" />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Расскажите о вашем объекте</label>
                      <textarea placeholder="Тип объекта, площадь, количество персонала..." rows={4} />
                    </div>
                    <label className={styles.checkbox}>
                      <input type="checkbox" required />
                      <span>Я согласен с <Link href="/privacy-policy" className={styles.checkboxLink}>Политикой обработки персональных данных</Link></span>
                    </label>
                    <button type="submit" className={styles.button}>
                      Получить расчёт
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Footer — Samara Mars Style */}
          <footer className={styles.footer}>
            <div className={styles.footerInner}>
              {/* Top Grid */}
              <div className={styles.footerGrid}>
                {/* Brand + Newsletter */}
                <div className={styles.footerBrand}>
                  <Logo />
                  <p className={styles.footerTagline}>Будьте в курсе новостей</p>
                  <div className={styles.newsletterForm}>
                    <input type="email" placeholder="Email" className={styles.newsletterInput} />
                    <button className={styles.newsletterBtn}>→</button>
                  </div>
                </div>

                {/* Navigation */}
                <div className={styles.footerColumn}>
                  <h5 className={styles.footerHeading}>Навигация</h5>
                  <nav className={styles.footerLinks}>
                    <Link href="/">Главная</Link>
                    <Link href="#services">Услуги</Link>
                    <Link href="#about">О компании</Link>
                    <Link href="#portfolio">Клиенты</Link>
                  </nav>
                </div>

                {/* Location */}
                <div className={styles.footerColumn}>
                  <h5 className={styles.footerHeading}>Контакты</h5>
                  <div className={styles.footerAddress}>
                    <span>Москва, Россия</span>
                    <a href="tel:+79999999999">+7 (999) 999-99-99</a>
                    <span>Работаем 24/7</span>
                  </div>
                </div>

                {/* Promo */}
                <div className={styles.footerColumn}>
                  <h5 className={styles.footerHeading}>Акция</h5>
                  <div className={styles.footerPromo}>
                    <span className={styles.promoTag}><Gift size={14} style={{display: 'inline', verticalAlign: 'middle', marginRight: '4px'}} /> Скидка 10%</span>
                    <span>для сетевых бизнесов</span>
                  </div>
                </div>
              </div>

              {/* Big Email */}
              <div className={styles.footerEmailRow}>
                <a href="mailto:info@mslclean.ru" className={styles.footerBigEmail}>
                  info@mslclean.ru
                </a>
                <div className={styles.footerSocial}>
                  <a href="#" className={styles.socialBtn}>Telegram</a>
                  <a href="#" className={styles.socialBtn}>WhatsApp</a>
                </div>
              </div>

              {/* Bottom */}
              <div className={styles.footerBottom}>
                <Link href="/privacy-policy" className={styles.footerPolicy}>Политика обработки персональных данных</Link>
                <span className={styles.footerCopyright}>ИП Маслов Е.О. ИНН 631704563230 | MSL Clean © 2025</span>
              </div>
            </div>
          </footer>
        </section>
      </div>
      <CookieBanner />
    </div>
  )
}
