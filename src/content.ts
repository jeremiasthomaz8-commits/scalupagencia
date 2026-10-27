export const navigation = [
  ['Início', '#inicio'],
  ['Soluções', '#solucoes'],
  ['Método', '#metodo'],
  ['Resultados', '#resultados'],
  ['Para quem é', '#para-quem'],
] as const
export const clients = [
  ['nobile', 'Nobile Hotels & Resorts'],
  ['cvc-franquias', 'CVC Franquias'],
  ['othon', 'Othon'],
  ['cresci-e-perdi', 'Cresci e Perdi'],
  ['praiamar', 'Praiamar Hotéis'],
  ['proa', 'Proa'],
  ['projetryx', 'Projetryx'],
  ['ela-bora', 'Ela Bora Viagens'],
  ['ccweis', 'CCWeiss'],
  ['nirvana', 'Nirvana Incensos'],
  ['grupo-zelo', 'Grupo Zelo'],
  ['petit-galerie', 'Petit Galerie'],
  ['vmz', 'VMZ Viagens'],
  ['dentista-do-povo', 'Dentista do Povo'],
  ['sueds-hotels', 'Sued’s Hotels'],
  ['lca', 'LCA Viagens & Eventos'],
]
export const services = [
  [
    'Mídia & Aquisição',
    'Gestão estratégica das principais plataformas de mídia paga, com foco em aquisição, performance e escala.',
  ],
  [
    'Conversão',
    'Landing pages, páginas de campanha e ativos digitais estruturados para transformar atenção em oportunidade.',
  ],
  [
    'Criativos de Performance',
    'Criativos desenvolvidos para testar hipóteses, encontrar ângulos vencedores e alimentar continuamente a operação de mídia.',
  ],
  [
    'Dados & Tecnologia',
    'Tracking, analytics, mensuração, dashboards e BI para transformar dados dispersos em informação que apoia decisão.',
  ],
  [
    'Automação & CRM',
    'Fluxos de nutrição, distribuição e qualificação de leads, integrações entre as ferramentas e o CRM para que nada esfrie entre o marketing e a venda.',
  ],
  [
    'Estratégia & Comercial',
    'Diagnóstico de marketing e vendas, auditorias, planejamento estratégico e estruturação comercial para conectar aquisição à receita.',
  ],
]
export const processSteps = [
  [
    'Onde você está',
    'Analisamos seu modelo de negócio, aquisição, investimento e estrutura atual.',
    'Entender o cenário',
  ],
  [
    'Onde estão os gargalos',
    'Identificamos os pontos que limitam performance, conversão e crescimento.',
    'Conectar os sinais',
  ],
  [
    'Onde existe oportunidade',
    'Encontramos o que pode ser otimizado, estruturado ou escalado.',
    'Encontrar potencial',
  ],
  [
    'O que faz sentido implementar',
    'A partir do diagnóstico, definimos a estrutura mais adequada para o momento da sua empresa.',
    'Definir a direção',
  ],
]
export const audience = [
  'Já possuem uma operação comercial ou processo de vendas.',
  'Já investem ou estão preparadas para investir em aquisição.',
  'Querem entender melhor o retorno do marketing.',
  'Sentem que existe potencial, mas a operação não performa como poderia.',
  'Querem deixar de decidir só com base em “achismo”.',
  'Estão prontas para estruturar marketing como uma área de crescimento.',
]
export const formOptions = {
  faturamento: [
    'Até R$ 50 mil/mês',
    'De R$ 50 mil a R$ 100 mil/mês',
    'De R$ 100 mil a R$ 300 mil/mês',
    'De R$ 300 mil a R$ 1 milhão/mês',
    'De R$ 1 milhão a R$ 5 milhões/mês',
    'Acima de R$ 5 milhões/mês',
    'Prefiro não informar',
  ],
  invest: [
    'Ainda não invisto',
    'Menos de R$ 5 mil/mês',
    'De R$ 5 mil a R$ 15 mil/mês',
    'De R$ 15 mil a R$ 30 mil/mês',
    'De R$ 30 mil a R$ 60 mil/mês',
    'De R$ 60 mil a R$ 150 mil/mês',
    'Acima de R$ 150 mil/mês',
  ],
  dor: [
    'Não sei o retorno real do que invisto em marketing',
    'Gero leads, mas as vendas não acompanham',
    'Minhas páginas / campanhas não convertem bem',
    'Meus dados e tracking não são confiáveis',
    'Não consigo escalar sem perder eficiência',
    'Falta estratégia conectando marketing e comercial',
    'Meu processo entre marketing, CRM e vendas é manual demais',
    'Outro',
  ],
}
export const externalLinks = {
  instagram: import.meta.env.VITE_INSTAGRAM_URL || '',
  linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
  privacy: import.meta.env.VITE_PRIVACY_URL || '',
}
