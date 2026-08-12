import { PurchaseNotifications } from "./purchase-notifications";
import Image from "next/image";

const checkout = "#oferta";
const checkoutUrl = "https://checkout.payt.com.br/c07e670b7bc8ebfdd99f4091ff2410ff";

const productSamples = [
  { src: "/produto/atividade-pontuacao-entoncao.webp", alt: "Miniatividade infantil sobre pontuação e entonação" },
  { src: "/produto/personagens-lugar-enredo.webp", alt: "Atividade infantil sobre personagens, lugar e enredo" },
  { src: "/produto/fatos-explicitos.webp", alt: "Mapa de interpretação para encontrar respostas diretas no texto" },
  { src: "/produto/releitura.webp", alt: "Mapa educativo mostrando como a releitura ajuda a compreender" },
  { src: "/produto/pontuacao.webp", alt: "Mapa infantil sobre como a pontuação muda o jeito de ler" },
  { src: "/produto/mapa-interpretacao.webp", alt: "Mapa mental completo sobre interpretação de texto", landscape: true },
];

const feedbacks = [
  { initials: "MP", name: "Mariana P.", role: "Professora", text: "O formato visual deixa muito mais fácil mostrar onde a criança deve procurar cada informação do texto." },
  { initials: "CS", name: "Camila S.", role: "Mãe", text: "Em vez de responder por ele, agora consigo fazer perguntas e usar o mapa para guiar o raciocínio." },
  { initials: "AR", name: "Ana R.", role: "Pedagoga", text: "Gostei da variedade. Dá para escolher o mapa de acordo com a habilidade que precisa ser praticada." },
  { initials: "LF", name: "Luciana F.", role: "Professora", text: "As atividades são organizadas e chamam a atenção sem deixar a página visualmente confusa." },
  { initials: "JB", name: "Juliana B.", role: "Responsável", text: "A criança consegue enxergar começo, meio e fim e fica menos perdida na hora de responder." },
];

function CTA({ label = "QUERO OS 120 MAPAS MENTAIS" }: { label?: string }) {
  return <a className="cta" href={checkout}><span>{label}</span><small>Acesso imediato • Pagamento único</small></a>;
}

export default function Home() {
  const doubledSamples = [...productSamples, ...productSamples];
  const doubledFeedbacks = [...feedbacks, ...feedbacks];
  return (
    <main>
      <div className="topbar">OFERTA ESPECIAL • MATERIAL DIGITAL COM ACESSO IMEDIATO</div>
      <header className="brandbar">
        <a className="brand" href="#top" aria-label="DestravaTexto - início">
          <span className="brand-mark"><span className="unlock-icon"><b>✓</b></span></span>
          <span className="brand-name">Destrava<span>Texto</span><small>MAPAS DE INTERPRETAÇÃO</small></span>
        </a>
      </header>

      <section className="hero section" id="top">
        <div className="hero-copy">
          <div className="eyebrow">Interpretação de texto de um jeito visual</div>
          <h1>Chega de ler várias vezes e ainda <em>não entender o texto</em></h1>
          <p className="lead">Com os <strong>120 Mapas DestravaTexto</strong>, a criança aprende a separar as informações, conectar ideias e encontrar respostas com mais clareza.</p>
        </div>
        <div className="hero-mockup">
          <div className="doodle d1">★</div><div className="doodle d2">✎</div><div className="doodle d3">●</div>
          <Image src="/mapas-infantis-mockup.webp" alt="Coleção de mapas mentais infantis coloridos" width={1200} height={800} priority sizes="(max-width: 820px) 100vw, 900px" />
          <div className="mockup-stamp"><b>120</b><span>MAPAS<br/>PRONTOS</span></div>
        </div>
        <CTA />
        <div className="hero-benefits">
          <div><b>🧠</b><span><strong>Raciocínio guiado</strong>Organiza cada parte do texto</span></div>
          <div><b>🎨</b><span><strong>Visual e atrativo</strong>Mantém a criança interessada</span></div>
          <div><b>🖨️</b><span><strong>Pronto para imprimir</strong>Use em casa ou na escola</span></div>
        </div>
        <div className="trust"><span>🔒 Compra segura</span><span>⚡ Acesso imediato</span><span>🛡️ Garantia de 30 dias</span></div>
      </section>

      <section className="materials section soft" id="materiais">
        <div className="section-heading"><span>VEJA O QUE VOCÊ RECEBE</span><h2>Mapas diferentes para cada desafio de leitura</h2><p>Deslize para conhecer alguns exemplos da biblioteca.</p></div>
        <div className="carousel-window" aria-label="Exemplos dos mapas mentais">
          <div className="materials-track">{doubledSamples.map((item,i)=><figure className={`product-slide${item.landscape ? " landscape" : ""}`} key={`${item.src}-${i}`}><Image src={item.src} alt={i < productSamples.length ? item.alt : ""} width={item.landscape ? 1200 : 850} height={item.landscape ? 800 : 1200} loading="lazy" sizes={item.landscape ? "(max-width: 480px) 430px, 560px" : "(max-width: 480px) 300px, 340px"}/></figure>)}</div>
        </div>
        <div className="carousel-hint">← o carrossel passa automaticamente →</div>
        <div className="samples-more">Esses e <strong>muuuuito mais!</strong></div>
        <div className="map-benefits">
          <article><div>🔍</div><h3>Encontra as informações</h3><p>A criança aprende a localizar pistas importantes sem se perder no texto.</p></article>
          <article><div>🧩</div><h3>Conecta as ideias</h3><p>Percebe a relação entre personagens, acontecimentos e consequências.</p></article>
          <article><div>✍️</div><h3>Responde com segurança</h3><p>Organiza o pensamento antes de escrever a resposta da atividade.</p></article>
          <article><div>🌟</div><h3>Aprende com leveza</h3><p>Cores e estruturas visuais tornam a prática mais interessante.</p></article>
        </div>
        <CTA label="QUERO ACESSAR OS MAPAS" />
      </section>

      <section className="for-who section">
        <div className="section-heading"><span>FEITO PARA QUEM PRECISA</span><h2>Para quem é o DestravaTexto?</h2></div>
        <div className="audience-grid">
          <article><b>👩‍🏫</b><div><h3>Professoras e pedagogas</h3><p>Que querem atividades prontas para trabalhar interpretação de forma visual.</p></div></article>
          <article><b>🏡</b><div><h3>Famílias</h3><p>Que desejam apoiar a leitura em casa sem transformar o estudo em conflito.</p></div></article>
          <article><b>🧒</b><div><h3>Crianças dos anos iniciais</h3><p>Que leem, mas ainda se perdem ao localizar e conectar informações.</p></div></article>
        </div>
      </section>

      <section className="how section">
        <div className="section-heading"><span>SEM COMPLICAÇÃO</span><h2>Como ter acesso e usar os mapas</h2><p>Você começa em poucos minutos, sem aplicativo e sem esperar uma entrega física.</p></div>
        <div className="steps">
          <article><b>1</b><div className="step-icon">📩</div><h3>Receba no e-mail</h3><p>O acesso ao material digital é enviado após a confirmação da compra.</p></article>
          <article><b>2</b><div className="step-icon">🗂️</div><h3>Escolha o mapa</h3><p>Selecione a habilidade de interpretação que deseja trabalhar.</p></article>
          <article><b>3</b><div className="step-icon">🖍️</div><h3>Imprima e aplique</h3><p>Imprima em folha A4 e acompanhe a criança durante a atividade.</p></article>
        </div>
      </section>

      <section className="feedback section dark">
        <div className="section-heading light"><span>EXEMPLOS DE FEEDBACK</span><h2>O tipo de mudança que os mapas podem apoiar</h2><p>Comentários ilustrativos para demonstrar como a seção ficará. Substitua por avaliações reais conforme elas chegarem.</p></div>
        <div className="carousel-window feedback-window">
          <div className="feedback-track">{doubledFeedbacks.map((item,i)=><article className="feedback-card" key={`${item.name}-${i}`}><div className="stars">★★★★★</div><p>“{item.text}”</p><div className="person"><b>{item.initials}</b><span><strong>{item.name}</strong><small>{item.role} • exemplo ilustrativo</small></span></div></article>)}</div>
        </div>
      </section>

      <section className="bonus section" id="bonus">
        <div className="section-heading"><span>VOCÊ TAMBÉM RECEBE</span><h2>3 bônus para aproveitar melhor o material</h2></div>
        <div className="bonus-grid">
          <article><b>BÔNUS 01</b><div>📖</div><h3>Guia de aplicação</h3><p>Orientações simples para conduzir a atividade sem entregar a resposta.</p></article>
          <article><b>BÔNUS 02</b><div>✅</div><h3>Checklist de leitura</h3><p>Passos para usar antes, durante e depois de cada texto.</p></article>
          <article><b>BÔNUS 03</b><div>🎲</div><h3>Desafios extras</h3><p>Atividades leves para reforçar interpretação de forma divertida.</p></article>
        </div>
      </section>

      <section className="offer section" id="oferta">
        <div className="offer-card">
          <div className="recommended">ACESSO COMPLETO</div>
          <div className="offer-head"><span className="mini-brand-mark"><span className="unlock-icon small"><b>✓</b></span></span><div><small>COLEÇÃO DIGITAL</small><h2>DestravaTexto</h2></div></div>
          <div className="offer-mockup"><Image src="/mapas-infantis-mockup.webp" alt="Mockup da coleção DestravaTexto com mapas mentais infantis" width={1200} height={800} loading="lazy" sizes="(max-width: 600px) 90vw, 480px"/><span>120 mapas + 3 bônus</span></div>
          <ul><li>✓ <b>120 mapas mentais infantis</b></li><li>✓ Temas variados de interpretação</li><li>✓ Arquivos prontos para imprimir</li><li>✓ 3 bônus exclusivos</li><li>✓ Acesso imediato e vitalício</li></ul>
          <div className="old-price">De R$ 47,00 por apenas:</div>
          <div className="price"><small>R$</small>17<sup>,00</sup></div>
          <div className="payment-note">Pagamento único • Sem mensalidade</div>
          <a href={checkoutUrl} className="buy-button">QUERO RECEBER AGORA</a>
          <div className="payment">🔒 Compra segura &nbsp; • &nbsp; PIX e cartão</div>
        </div>
      </section>

      <section className="guarantee section">
        <div className="seal">30<small>DIAS</small></div>
        <div><span className="eyebrow">RISCO ZERO</span><h2>Você tem 30 dias para conhecer</h2><p>Se dentro desse período o material não fizer sentido para você, basta solicitar o reembolso conforme as condições da plataforma. Assim, você pode acessar e avaliar com tranquilidade.</p></div>
      </section>

      <section className="faq section soft">
        <div className="section-heading"><span>DÚVIDAS FREQUENTES</span><h2>Ainda ficou com alguma dúvida?</h2></div>
        <div className="faq-list">
          <details><summary>Como recebo o material?<i>＋</i></summary><p>Após a confirmação do pagamento, o acesso é enviado para o e-mail informado na compra.</p></details>
          <details><summary>O material é físico?<i>＋</i></summary><p>Não. O produto é 100% digital. Você baixa os arquivos e imprime onde preferir.</p></details>
          <details><summary>Posso acessar pelo celular?<i>＋</i></summary><p>Sim. Você pode baixar e visualizar no celular, tablet ou computador.</p></details>
          <details><summary>Para qual idade é indicado?<i>＋</i></summary><p>O material foi pensado para crianças dos anos iniciais do Ensino Fundamental, com acompanhamento quando necessário.</p></details>
          <details><summary>Posso imprimir mais de uma vez?<i>＋</i></summary><p>Sim, para uso pessoal ou com seus próprios alunos, respeitando os termos da licença.</p></details>
          <details><summary>O acesso vence?<i>＋</i></summary><p>Não. Depois de baixar os arquivos, você pode guardá-los e consultar sempre que precisar.</p></details>
        </div>
      </section>

      <PurchaseNotifications />

      <footer><b>DestravaTexto</b><p>Material educativo digital. Os resultados variam conforme a aplicação e o acompanhamento.</p><div>© 2026 • Todos os direitos reservados</div></footer>
    </main>
  );
}
