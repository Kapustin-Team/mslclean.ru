'use client'

import { useState } from 'react'
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
  Gift,
  ChevronDown,
  BriefcaseBusiness,
  ClipboardCheck,
  Wrench,
  ThumbsUp,
  RefreshCw,
  Shield,
  Heart
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import styles from './page.module.css'
import { MobileMenu } from '@/components/molecules'
import { Logo } from '@/components/atoms'
import { SplitText, AnimatedTag } from '@/components/atoms'
import CookieBanner from '@/components/organisms/CookieBanner'

// FAQ компонент
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className={styles.faqItem} data-open={isOpen}>
    <button className={styles.faqQuestion} onClick={onClick}>
      <span>{question}</span>
      <ChevronDown size={20} className={styles.faqChevron} />
    </button>
    <motion.div
      className={styles.faqAnswer}
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <p>{answer}</p>
    </motion.div>
  </div>
)

const FAQ_DATA = [
  {
    q: 'Как быстро вы можете вывести персонал на объект?',
    a: 'Готовый сотрудник выходит на объект в течение 24-48 часов после подписания договора. Для экстренных случаев — возможен вывод в день обращения.',
  },
  {
    q: 'Что происходит, если клинер заболел или не вышел?',
    a: 'Мы гарантируем замену в течение 2 часов. У нас всегда есть резервный персонал, готовый выйти на любой объект. Вы не заметите разницы — работа не остановится.',
  },
  {
    q: 'Какие документы нужны для начала работы?',
    a: 'Достаточно заключить договор аутстаффинга. Мы берём на себя все юридические вопросы: оформление сотрудников, налоги, ПФР, страховки. Вы получаете счёт и акт.',
  },
  {
    q: 'Чем аутстаффинг отличается от обычного найма клинера?',
    a: 'При аутстаффинге сотрудник оформлен у нас, а работает у вас. Вы не платите налоги, не оформляете кадровые документы, не решаете конфликты. Если сотрудник не подходит — мы заменим его бесплатно.',
  },
  {
    q: 'Как формируется цена?',
    a: 'Цена фиксированная и зависит от площади объекта, графика работы и количества персонала. Никаких скрытых платежей — вы всегда знаете итоговую сумму. Оплата только безналичная.',
  },
  {
    q: 'Работаете ли вы с сетевыми объектами?',
    a: 'Да, мы специализируемся на сетевых фитнес-клубах и ресторанах. Для сетевых клиентов действует скидка 10% и персональный менеджер на каждый объект.',
  },
  {
    q: 'Кто контролирует качество уборки?',
    a: 'За каждым объектом закреплён персональный менеджер, который проводит регулярные проверки качества. Если результат вас не устраивает — замена сотрудника в течение дня без доплаты.',
  },
  {
    q: 'Какую ответственность вы несёте за действия персонала?',
    a: 'Полную. Все сотрудники застрахованы. Если клинер что-то повредил или потерял — мы компенсируем ущерб. Вы юридически защищены договором.',
  },
]

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
      'Занимаетесь налогами, ПФР и документами',
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
    desc: 'Мы подбираем персонал по 7 параметрам. Замена — за 2 часа.',
    highlight: 'Готовый сотрудник за 24-48 часов',
    image: '/images/solution-staff.png',
    params: [
      { icon: BriefcaseBusiness, label: 'Опыт' },
      { icon: ClipboardCheck, label: 'Документы' },
      { icon: Wrench, label: 'Навыки' },
      { icon: ThumbsUp, label: 'Рекомендации' },
      { icon: RefreshCw, label: 'Адаптивность' },
      { icon: Shield, label: 'Устойчивость' },
      { icon: Heart, label: 'Ответственность' },
    ],
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
    title: 'Специализируемся на фитнес-клубах и ресторанах',
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
    desc: 'Следим не только за чистотой на объекте, но и за юридическим оформлением',
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
    title: 'Сотрудничество',
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
  const [openFaq, setOpenFaq] = useState(null)
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
                <a href="tel:+79661155450">+7 (966) 115-54-50</a>
                <span className={styles.navPhoneHint}>Ежедневно 8:00–23:00</span>
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
                <SplitText as="span" delay={0.2}>Чистота без управленческих забот</SplitText>
              </h1>
              
              {/* Content box */}
              <motion.div 
                className={styles.heroContent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className={styles.heroText}>
                  Подбор, замена и контроль процесса подключений под ключ для ресторанов и фитнес-клубов. 
                  Мы предоставляем сотрудников и полностью берём на себя управление их работой.
                </p>
                <Link href="#contact" className={styles.heroButton}>
                  Связаться с нами
                </Link>
              </motion.div>

              {/* Key facts strip */}
              <motion.div
                className={styles.heroFacts}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className={styles.heroFactItem}>Фиксированная цена</div>
                <div className={styles.heroFactItem}>Договор</div>
                <div className={styles.heroFactItem}>Безналичная оплата</div>
                <div className={styles.heroFactItem}>Аутстаффинг персонала</div>
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
            className={styles.bannerInner}
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.bannerBkg}>
              <Image 
                src="/images/banner-kitchen.jpg"
                alt="Команда клининга за работой в ресторане"
                fill
                className={styles.bannerImage}
              />
              <div className={styles.bannerOverlay} />
            </div>
          </motion.div>
        </section>

        {/* ===================== PROBLEMS ===================== */}
        <section className={styles.problemsSection} id="problems">
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Проблемы</AnimatedTag>
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

        {/* ===================== CTA BETWEEN ===================== */}
        <section className={styles.ctaBetween}>
          <div className={styles.sectionPadding}>
            <div className={styles.ctaBetweenInner}>
              <p className={styles.ctaBetweenText}>Готовы избавиться от проблем с персоналом?</p>
              <Link href="#contact" className={styles.ctaBetweenButton}>Получить расчёт</Link>
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
                      {solution.params && (
                        <div className={styles.paramsGrid}>
                          {solution.params.map((p, pi) => {
                            const PIcon = p.icon
                            return (
                              <div key={pi} className={styles.paramItem}>
                                <PIcon size={14} strokeWidth={1.5} />
                                <span>{p.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                      <div className={styles.solutionHighlight}>{solution.highlight}</div>
                    </div>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA BETWEEN 2 ===================== */}
        <section className={styles.ctaBetween}>
          <div className={styles.sectionPadding}>
            <div className={styles.ctaBetweenInner}>
              <p className={styles.ctaBetweenText}>Хотите узнать стоимость для вашего объекта?</p>
              <Link href="#contact" className={styles.ctaBetweenButton}>Оставить заявку</Link>
            </div>
          </div>
        </section>

        {/* ===================== USP ===================== */}
        <section className={styles.uspSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Выгоды</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Ваши выгоды от работы с нами</SplitText>
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
              <AnimatedTag>Сотрудничество</AnimatedTag>
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

        {/* ===================== FOR WHO ===================== */}
        <section className={styles.forWhoSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Направления</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Для кого мы работаем</SplitText>
              <SplitText as="p" className={styles.sectionSubtitle} delay={0.2}>Мы работаем с бизнесом, где важна чистота как стандарт, дисциплина и стабильный результат</SplitText>
            </div>

            <div className={styles.forWhoGrid}>
              {[
                { title: 'Фитнес-клубы', desc: 'Ежедневная уборка залов, раздевалок, бассейнов' },
                { title: 'Рестораны и кафе', desc: 'Чистота кухни и зала по стандартам СЭС' },
                { title: 'HoReCa', desc: 'Отели, кейтеринг, банкетные площадки' },
                { title: 'Коммерческие помещения', desc: 'Офисы, бизнес-центры, торговые площади' },
              ].map((item, i) => (
                <CardReveal key={i} delay={i * 0.1}>
                  <div className={styles.forWhoCard}>
                    <h3 className={styles.forWhoCardTitle}>{item.title}</h3>
                    <p className={styles.forWhoCardDesc}>{item.desc}</p>
                  </div>
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CTA BETWEEN 3 ===================== */}
        <section className={styles.ctaBetween}>
          <div className={styles.sectionPadding}>
            <div className={styles.ctaBetweenInner}>
              <p className={styles.ctaBetweenText}>Узнайте, как мы можем помочь вашему бизнесу</p>
              <Link href="#contact" className={styles.ctaBetweenButton}>Связаться с нами</Link>
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

        {/* ===================== FAQ ===================== */}
        <section className={styles.faqSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.sectionTop}>
              <AnimatedTag>Вопросы</AnimatedTag>
              <SplitText as="h2" className={styles.sectionTitle} delay={0.1}>Часто задаваемые вопросы</SplitText>
            </div>

            <div className={styles.faqList}>
              {FAQ_DATA.map((item, i) => (
                <CardReveal key={i} delay={i * 0.05}>
                  <FAQItem
                    question={item.q}
                    answer={item.a}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                </CardReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== FINAL CTA ===================== */}
        <section className={styles.finalCtaSection}>
          <div className={styles.sectionPadding}>
            <div className={styles.finalCtaInner}>
              <SplitText as="h2" className={styles.finalCtaTitle} delay={0.1}>Готовы повысить стандарт чистоты вашего объекта?</SplitText>
              <p className={styles.finalCtaText}>
                Завтра ваша команда будет работать без головной боли с поиском и заменой персонала. 
                Оставьте заявку — мы предложим решение под ваш объект.
              </p>
              <Link href="#contact" className={styles.finalCtaButton}>
                Получить расчёт бесплатно
              </Link>
            </div>
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
                    <a href="tel:+79661155450" className={styles.contactPhone}>
                      +7 (966) 115-54-50
                    </a>
                    <span className={styles.contactHint}>Ежедневно 8:00–23:00</span>
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
                {/* Brand */}
                <div className={styles.footerBrand}>
                  <Logo />
                  <p className={styles.footerTagline}>Аутстафинг клинингового персонала для ресторанов и фитнес-клубов</p>
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
                    <a href="tel:+79661155450">+7 (966) 115-54-50</a>
                    <span>Ежедневно 8:00–23:00</span>
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

              {/* Big Email + Phone */}
              <div className={styles.footerContactRow}>
                <a href="mailto:info@mslclean.ru" className={styles.footerBigContact}>
                  info@mslclean.ru
                </a>
                <a href="tel:+79661155450" className={styles.footerBigContact}>
                  +7 (966) 115-54-50
                </a>
              </div>
              <div className={styles.footerSocialRow}>
                <Link href="https://t.me/MSLClean" className={styles.socialBtn}>Telegram</Link>
                <Link href="https://t.me/MSLClean" className={styles.socialBtn}>WhatsApp</Link>
              </div>

              {/* Bottom */}
              <div className={styles.footerBottom}>
                <Link href="/privacy-policy" className={styles.footerPolicy}>Политика обработки персональных данных</Link>
                <span className={styles.footerCopyright}>ИП Маслов Е.О. ИНН 631704563230 | MSL Clean © 2026</span>
              </div>
            </div>
          </footer>
        </section>
      </div>
      <CookieBanner />
    </div>
  )
}
