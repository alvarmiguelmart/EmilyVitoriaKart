Link de acesso: https://alvarmiguelmart.github.io/EmilyVitoriaKart/

Link de acesso no vercel: https://emilyvitoriakart.vercel.app/

# Emily Vitória Kart — EV33

Site oficial da piloto mirim Emily Vitória Martins Pinto, desenvolvido para apresentar sua história, conquistas e captar investidores, patrocinadores e apoiadores.

Paleta: azul `#1B4FE4` e rosa `#FF3FA4`, tema escuro, tipografia Racing Sans One + Barlow Condensed.

---

## Estrutura

```
emily-vitoria-kart/
  index.html      página principal
  style.css       estilos e paleta de cores
  main.js         animações e interatividade
  vercel.json     configuração de deploy
  README.md       este arquivo
```

---

## Personalizações

**Adicionar fotos reais na galeria**

Cada card da galeria usa SVG ilustrativo por padrão. Para substituir por foto real, localize o elemento `.gc-art` correspondente no `index.html` e troque o conteúdo interno:

```html
<div class="gc-art" style="background: none;">
  <img
    src="foto.jpg"
    alt="Descrição"
    style="width: 100%; height: 100%; object-fit: cover;"
  />
  <div class="gc-overlay">
    <span class="gc-label">Legenda da foto</span>
  </div>
</div>
```

**Adicionar logos de apoiadores**

Na seção `#apoiadores`, os cards `.ap-real` aceitam uma tag `<img>` no lugar do ícone de texto:

```html
<div class="ap-real reveal">
  <img src="logo.png" alt="Nome da empresa" style="max-height: 48px; object-fit: contain;" />
  <strong>Nome da empresa</strong>
</div>
```

**Atualizar estatísticas**

Os contadores animados usam o atributo `data-target`. Localize os elementos e ajuste o valor:

```html
<!-- Hero -->
<span class="hstat-num" data-target="7">0</span>

<!-- Seção de números -->
<span class="n-num" data-target="20">0</span>
```

---

## Paleta de cores

```css
--blue:  #1B4FE4   /* azul principal, macacão EV33 */
--pink:  #FF3FA4   /* rosa principal, macacão EV33 */
--dark:  #09090f   /* fundo base */
--dark2: #0e0e1a   /* fundo de seções alternadas */
--dark3: #141424   /* cards e formulários */
```

---

## Seções

| Seção | Descrição |
|---|---|
| Hero | Abertura com título, pills de conquistas e contadores animados |
| Ticker | Faixa com conquistas em loop contínuo |
| Sobre | História da Emily, família e preparador Celso da Kosta |
| Conquistas | Timeline desde a origem até os planos para 2026 |
| Números | Grade de estatísticas com animação ao entrar na tela |
| Galeria | Cards visuais: kart, pódio, semáforo, capacete e mapa de pistas |
| Por que investir | Argumentos para patrocinadores e tabela de cotas |
| Apoiadores | Grid com parceiros atuais e vagas em aberto |
| Depoimentos | Citações do pai, preparador e Câmara de Irati |
| Apoie | Formulário de contato com validação e opções de apoio |
| Footer | Links de navegação, redes sociais e informações de contato |

---

## Contato e parcerias

**Email:** ev33parcerias@gmail.com  
**WhatsApp:** +55 41 99934-8740  
**Instagram:** @emilyvitoriakart  
**Site de rifas:** emilyvitoriakart.com
