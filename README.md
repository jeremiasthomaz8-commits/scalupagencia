# ScalUp Agência

Site comercial bilíngue (PT/EN) em React, TypeScript e Vite. A landing page abre na raiz `/`.

## Desenvolvimento

Requer Node.js 22.12+ e npm.

```sh
npm ci
npm run dev
```

## Validação e build

```sh
npm run lint
npm run build
npm test
```

Os testes usam Chrome local e as portas 5181/5182. As chamadas do formulário são simuladas; nenhum lead é enviado ao receptor real nos testes. Capturas são geradas em `research/redesign-review/`.

## Publicação

- Instalação: `npm ci`
- Build: `npm run build`
- Diretório de saída: `dist`

Sirva `dist` na raiz do domínio. O projeto está pronto para hospedagem estática. Enviar o código ao GitHub não publica automaticamente o site nem altera DNS.

## Identidade e conteúdo

- Lufga local: Bold nos títulos, Regular nos textos e subtítulos, Medium nos botões.
- Logos oficiais, retrato na hero e logos de clientes em `public/`.
- Textos e traduções em `src/i18n/messages.ts`.
- Layout responsivo, navegação por teclado e suporte a movimento reduzido.

## Formulário

O adaptador `src/lib/submit-lead.ts` utiliza o receptor público Google Apps Script do site atual. O sucesso exige HTTP 2xx e JSON `{ "ok": true }`.

Veja `.env.example` para substituir `VITE_LEAD_ENDPOINT` ou configurar as URLs de Instagram, LinkedIn e política de privacidade. Um endpoint explicitamente vazio desativa o envio e apresenta a alternativa de WhatsApp. Variáveis `VITE_*` são públicas; não coloque segredos nelas.

A entrega real e o CORS devem ser verificados no domínio de publicação. O receptor deve implementar validação, limitação de requisições e deduplicação.
