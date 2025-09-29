# 🎓 ABP - Aprendendo Português

**Gerador de PDFs Educacionais Multilíngues com Jogos Interativos**

Uma aplicação React moderna que gera PDFs educacionais personalizados com atividades lúdicas para o ensino de português como segunda língua. Suporta 5 idiomas e inclui 9 tipos diferentes de jogos pedagógicos.

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-38B2AC?logo=tailwind-css)
![i18next](https://img.shields.io/badge/i18next-25.5.2-26A69A?logo=i18next)

## ✨ Funcionalidades Principais

### 🌍 **Internacionalização Completa**
- **5 idiomas suportados**: Português, Inglês, Espanhol, Francês e Alemão
- Interface e conteúdo dos PDFs totalmente traduzidos
- Fallback automático para português
- Seletor de idioma dinâmico

### 🎮 **9 Jogos Educacionais Integrados**

1. **🧠 Jogo da Memória** - Associação imagem-palavra com pares personalizados
2. **🎯 Bingo de Letras** - Cartelas 3x3, 4x4 e 5x5 com letras aleatórias
3. **🔍 Caça ao Objeto** - Lista de objetos para identificação no ambiente
4. **🎲 Dominó de Palavras** - Peças com sílabas para formação de palavras
5. **🎪 Jogo da Forca** - Template visual para adivinhação de palavras
6. **💬 Cartões de Debate** - 5 categorias temáticas com frases provocativas
7. **🔤 Caça-Palavras** - Grades geradas automaticamente por tema
8. **📚 Continuação de História** - Cartões com frases para narrativa colaborativa
9. **🎨 Cartões de Palavras** - Substantivos, verbos e adjetivos categorizados

### 📄 **Geração de PDF Avançada**
- **Múltiplas páginas especializadas**: conteúdo, instruções, jogos, moldes
- **Layouts responsivos** com grids e flexbox
- **Imagens integradas** convertidas para base64
- **Estilos personalizados** para cada tipo de atividade
- **Moldes para montagem** de maleta organizadora

## 🚀 Instalação e Uso

```bash
# Clone e instale
git clone [https://github.com/seu-usuario/site_ABP_aprendendo_portugues.git](https://github.com/seu-usuario/site_ABP_aprendendo_portugues.git)
cd site_ABP_aprendendo_portugues
pnpm install

# Execute em desenvolvimento
pnpm dev

# Build para produção
pnpm build

```
### Como Usar
- Selecione o idioma no seletor superior direito
- Clique em "Gerar PDF"
- O arquivo jogos-{idioma}.pdf será baixado automaticamente

```src/
├── components/           # Componentes React reutilizáveis
├── features/pdf/         # Módulo de geração de PDF
├── i18n/                # Internacionalização (5 idiomas)
├── lib/                 # Utilitários e geradores de jogos
└── assets/              # Recursos estáticos
```

```typescript
import { PdfData } from './src/features/pdf/pdf.templates';

const customPdfData: PdfData = {
  locale: "pt",
  coverTitle: "Meus Jogos Personalizados",
  
  // Habilitar jogos específicos
  bingo: { enabled: true, rows: 4, cols: 4, cards: 8 },
  wordCards: {
    enabled: true,
    categories: [{
      title: "Animais",
      color: "#FF6B6B", 
      colorText: "#FFF",
      words: ["gato", "cão", "pássaro"]
    }]
  },
  
  // Configurar outros jogos...
  domino: { enabled: true, syllables: ["ca", "sa", "ma"] },
  memoryGame: { 
    enabled: true, 
    pairs: [
      { word: "casa", image: "/path/to/house.jpg" },
      { word: "carro", image: "/path/to/car.jpg" }
    ]
  }
};
```

📊 **Conteúdo Incluído**
- **150+** palavras categorizadas (substantivos, verbos, adjetivos)
- **50+** frases para continuação de histórias
- **100+** objetos para caça ao tesouro
- **25** temas para debates educacionais
- **Moldes físicos para montagem de jogos**

🌐 **Deploy**
- Vercel: vercel --prod 

🤝 **Contribuição**
- Fork o projeto
- Crie sua feature branch
- Commit suas mudanças
- Abra um Pull Request

📈 **Roadmap**
- Interface para configuração de jogos
- Preview do PDF antes do download
- Editor visual de cartões
- Dashboard de progresso do aluno

Desenvolvido com ❤️ para educadores e estudantes de português