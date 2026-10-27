import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Guard against any accidental contact with the live CRM during tests.
  await page.route('https://script.google.com/**', (route) => route.abort())
})

test('responsive layout, real logos, navigation targets and console', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await expect(page).toHaveTitle(/ScalUp Agência/)
  for (const width of [375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await expect(
      page.getByRole('link', { name: 'Quero meu diagnóstico', exact: true }).first(),
    ).toBeVisible()
  }
  const broken = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .filter((a) => !document.getElementById(a.getAttribute('href')!.slice(1)))
        .map((a) => a.outerHTML),
    )
  expect(broken).toEqual([])
  await page.locator('.marquee').scrollIntoViewIfNeeded()
  await expect(page.locator('.logo-group').first().locator('img')).toHaveCount(16)
  await expect
    .poll(() =>
      page
        .locator('.logo-group')
        .first()
        .locator('img')
        .evaluateAll((imgs) => imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0)),
    )
    .toBe(true)
  await page.getByRole('button', { name: 'Pausar logos' }).click()
  await expect(page.locator('.marquee-track')).toHaveCSS('animation-play-state', 'paused')
  expect(errors).toEqual([])
})

test('mobile hero keeps both buttons aligned and the portrait below the copy', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const language of ['Português', 'English']) {
    await page.getByRole('button', { name: language, exact: true }).click()
    for (const width of [320, 360, 375, 390, 414, 430, 480, 540, 580]) {
      await page.setViewportSize({ width, height: 900 })
      await page.evaluate(() => document.fonts.ready)
      const boxes = await page.evaluate(() => {
        const box = (selector: string) => {
          const r = document.querySelector(selector)!.getBoundingClientRect()
          return { top: r.top, bottom: r.bottom, left: r.left, width: r.width, height: r.height }
        }
        return {
          copy: box('.hero-copy'),
          stage: box('.hero-stage'),
          portrait: box('.hero-portrait img'),
          actions: box('.hero-actions'),
          primary: box('.hero-actions .shiny-button'),
          secondary: box('.hero-actions .secondary-button'),
          overflow: document.documentElement.scrollWidth > innerWidth,
        }
      })
      expect(boxes.overflow, `${language} at ${width}px`).toBe(false)
      expect(boxes.stage.top - boxes.copy.bottom).toBeGreaterThanOrEqual(31)
      expect(boxes.portrait.top).toBeGreaterThanOrEqual(boxes.stage.top)
      expect(boxes.portrait.bottom).toBeLessThanOrEqual(boxes.stage.bottom + 1)
      expect(boxes.secondary.top - boxes.primary.bottom).toBeGreaterThanOrEqual(11)
      for (const button of [boxes.primary, boxes.secondary]) {
        expect(button.height).toBeGreaterThanOrEqual(52)
        expect(Math.abs(button.width - boxes.actions.width)).toBeLessThan(1)
        expect(Math.abs(button.left - boxes.actions.left)).toBeLessThan(1)
      }
      if (language === 'Português' && [390, 430, 580].includes(width)) {
        await page.setViewportSize({ width, height: 1500 })
        await page.locator('#inicio').screenshot({
          path: `research/redesign-review/mobile-hero-${width}.png`,
          animations: 'disabled',
          style: '.site-header, .skip-link { visibility: hidden !important; }',
        })
      }
    }
  }
})

test('mobile menu traps focus, closes on Escape and follows links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Abrir menu' })
  await trigger.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(
      true,
    )
  }
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page
    .getByRole('navigation', { name: 'Navegação móvel' })
    .getByRole('link', { name: 'Metodologia', exact: true })
    .click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page).toHaveURL(/#metodologia$/)
})

test('four diagnostic stages and reduced motion keep all content readable', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page
    .locator('#etapa-3')
    .evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }))
  await expect(page.locator('.process-step')).toHaveCount(4)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await expect(page.locator('.marquee-track')).toHaveCSS('animation-name', 'none')
  await expect(page.locator('h1')).toHaveCSS('opacity', '1')
  await expect(page.locator('.reveal-ready').first()).toHaveCount(0)
  await expect(page.locator('.logo-group').first()).toHaveCSS('display', 'grid')
})

test('language preference survives reload and metadata follows the selected language', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('ScalUp Agency | Marketing, acquisition and sales')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /real sales opportunities/,
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://scalupagencia.com/',
  )
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow')
})

for (const width of [390, 768, 1024, 1440]) {
  test(`complete PT and EN page at ${width}px, with review screenshots`, async ({ page }) => {
    test.setTimeout(90000)
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const language of ['pt', 'en']) {
      if (language === 'en')
        await page.getByRole('button', { name: 'English', exact: true }).click()
      await page.locator('#inicio').scrollIntoViewIfNeeded()
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({
        path: `research/redesign-review/${language}-${width}-hero.png`,
        animations: 'disabled',
      })
      for (const section of [
        '#problema',
        '#metodologia',
        '#solucoes',
        '#metodo',
        '#resultados',
        '#diferencial',
        '#para-quem',
        '.final-cta',
        'footer',
      ]) {
        await page.locator(section).scrollIntoViewIfNeeded()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        )
        await expect(page.locator(section)).toBeVisible()
      }
      await expect(page.locator('form, #diagnostico')).toHaveCount(0)
      await expect(page.locator('.header-cta')).toHaveAttribute('href', 'https://wa.me/5511918215500')
      for (const cta of await page.locator('.shiny-button, .footer-main > div:nth-child(2) a:last-child').all()) {
        await expect(cta).toHaveAttribute('href', 'https://wa.me/5511918215500')
      }
      await expect(page.locator('.pillar-card')).toHaveCount(6)
      await expect(page.locator('.process-step')).toHaveCount(4)
      await expect(page.locator('.system-node')).toHaveCount(9)
      await expect(page.locator('h1')).toHaveCSS('font-weight', '700')
      await expect(page.locator('.hero-description')).toHaveCSS('font-weight', '400')
      await expect(page.locator('.hero-actions .shiny-button')).toHaveCSS('font-weight', '500')
      const broken = await page
        .locator('img')
        .evaluateAll((imgs) =>
          imgs.filter((img) => img.complete && !img.naturalWidth).map((img) => img.src),
        )
      expect(broken).toEqual([])
      for (const reveal of await page.locator('.reveal-ready').all()) {
        await reveal.scrollIntoViewIfNeeded()
        await expect(reveal).toHaveClass(/revealed/)
      }
      if (language === 'pt') {
        for (const id of ['problema', 'metodologia', 'solucoes', 'metodo', 'resultados', 'diferencial', 'para-quem']) {
          await page.locator(`#${id}`).screenshot({ path: `research/redesign-review/pt-${width}-${id}.png`, animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' })
        }
        await page.locator('.final-cta').screenshot({ path: `research/redesign-review/pt-${width}-closing.png`, animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' })
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.screenshot({
        path: `research/redesign-review/${language}-${width}-page.png`,
        fullPage: true,
        animations: 'disabled',
      })
    }
  })
}
