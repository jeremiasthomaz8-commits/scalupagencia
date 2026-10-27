import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // Guard against any accidental contact with the live CRM during tests.
  await page.route('https://script.google.com/**', (route) => route.abort())
})

async function operation(page: Page) {
  await page.getByLabel('Faturamento médio mensal', { exact: true }).selectOption({ index: 1 })
  await page
    .getByLabel('Investimento mensal em marketing e mídia', { exact: true })
    .selectOption({ index: 2 })
  await page.getByLabel('Principal desafio', { exact: true }).selectOption({ index: 2 })
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
}
async function contact(page: Page) {
  await page.getByLabel('Nome', { exact: true }).fill('Teste local')
  await page.getByLabel('WhatsApp com DDD', { exact: true }).fill('(11) 99999-9999')
  await page.getByLabel('E-mail', { exact: true }).fill('teste@example.com')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
}
async function finish(page: Page) {
  await page.getByLabel('Qual é o seu site ou Instagram?').fill('@teste_local')
  await page.getByRole('checkbox').check()
}

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
    .getByRole('link', { name: 'Contato' })
    .click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page).toHaveURL(/#diagnostico$/)
})

test('form validates, preserves answers, confirms only acknowledged delivery and prevents duplicates', async ({
  page,
}) => {
  let submissions = 0
  await page.route('**/__test/lead', async (route) => {
    submissions++
    const data = new URLSearchParams(route.request().postData()!)
    expect(data.get('nome')).toBe('Teste local')
    expect(data.get('website_hp')).toBe('')
    expect(data.get('consent')).toBe('on')
    await new Promise((resolve) => setTimeout(resolve, 350))
    await route.fulfill({ status: 200, json: { ok: true } })
  })
  await page.goto('/#diagnostico')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.locator('#faturamento')).toBeFocused()
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3)
  await operation(page)
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.locator('#whats-error')).toBeVisible()
  await expect(page.locator('#email-error')).toBeVisible()
  await contact(page)
  await page.getByRole('button', { name: 'Voltar' }).click()
  await expect(page.locator('#nome')).toHaveValue('Teste local')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await page.getByRole('button', { name: 'Quero falar com a ScalUp' }).click()
  await expect(page.locator('#consent-error')).toBeVisible()
  await finish(page)
  await page.getByRole('button', { name: 'Quero falar com a ScalUp' }).click()
  await expect(page.getByRole('button', { name: 'Enviando…' })).toBeDisabled()
  await page.locator('form').evaluate((el) => {
    el.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  })
  await expect(page.getByRole('heading', { name: 'Recebemos suas informações.' })).toBeVisible()
  expect(submissions).toBe(1)
})

for (const kind of ['http', 'malformed', 'rejected', 'network'])
  test(`no false success for ${kind} failure`, async ({ page }) => {
    await page.route('**/__test/lead', (route) =>
      kind === 'network'
        ? route.abort()
        : route.fulfill(
            kind === 'http'
              ? { status: 500, json: { ok: false } }
              : kind === 'malformed'
                ? { status: 200, contentType: 'text/html', body: 'not JSON' }
                : { status: 200, json: { ok: false } },
          ),
    )
    await page.goto('/#diagnostico')
    await operation(page)
    await contact(page)
    await finish(page)
    await page.getByRole('button', { name: 'Quero falar com a ScalUp' }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Recebemos suas informações.' })).toHaveCount(0)
    await expect(page.locator('#site')).toHaveValue('@teste_local')
  })

test('unconfigured receiver does not send or fabricate success', async ({ page }) => {
  let posts = 0
  page.on('request', (request) => {
    if (request.method() === 'POST') posts++
  })
  await page.goto('http://127.0.0.1:5182/#diagnostico')
  await operation(page)
  await contact(page)
  await finish(page)
  await page.getByRole('button', { name: 'Quero falar com a ScalUp' }).click()
  await expect(page.getByRole('alert')).toContainText('ainda não está disponível')
  expect(posts).toBe(0)
})

test('honeypot blocks transmission', async ({ page }) => {
  let posts = 0
  page.on('request', (request) => {
    if (request.method() === 'POST') posts++
  })
  await page.goto('/#diagnostico')
  await page.locator('[name="website_hp"]').fill('spam', { force: true })
  await operation(page)
  await contact(page)
  await finish(page)
  await page.getByRole('button', { name: 'Quero falar com a ScalUp' }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  expect(posts).toBe(0)
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

test('language switching preserves form progress, answers and translates existing errors', async ({
  page,
}) => {
  await page.goto('/#diagnostico')
  await operation(page)
  await page.locator('#nome').fill('Teste local')
  await page.getByRole('button', { name: 'Continuar', exact: true }).click()
  await expect(page.locator('#email-error')).toContainText('Informe um e-mail')
  await page.getByRole('button', { name: 'English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('#nome')).toHaveValue('Teste local')
  await expect(page.locator('#email-error')).toContainText('Enter a valid email')
  await expect(page.getByRole('heading', { name: 'How can we reach you?' })).toBeVisible()
  await page.getByRole('button', { name: 'Back', exact: true }).click()
  await expect(page.locator('#faturamento')).toHaveValue('Até R$ 50 mil/mês')
  await expect(page.locator('#faturamento option:checked')).toHaveText('Up to R$ 50,000/month')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.locator('#whats').fill('+55 (11) 99999-9999')
  await page.locator('#email').fill('test@example.com')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await expect(page.locator('.form-summary')).toContainText('Up to R$ 50,000/month')
  await expect(page.locator('.form-summary')).not.toContainText('Até R$')
  await page.locator('#site').fill('@local_test')
  await page.getByRole('checkbox').check()
  await page.route('**/__test/lead', (route) => route.fulfill({ status: 200, json: { ok: true } }))
  await page.getByRole('button', { name: 'Talk to ScalUp', exact: true }).click()
  await expect(
    page.getByRole('heading', { name: 'We’ve received your information.' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Português', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Recebemos suas informações.' })).toBeVisible()
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
        '#diagnostico',
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
        for (const id of ['problema', 'metodologia', 'solucoes', 'metodo', 'resultados', 'diferencial', 'diagnostico', 'para-quem']) {
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
