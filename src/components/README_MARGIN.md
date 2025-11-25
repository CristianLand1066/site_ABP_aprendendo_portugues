# 🎨 Componente renderMargin

Componente de borda decorativa reutilizável para páginas do PDF.

## 📦 Uso Básico

```tsx
import { renderMargin } from "../components/renderMargin";

// Dentro de uma Page do @react-pdf/renderer
<Page size="A4" style={styles.page}>
  {renderMargin()}
  
  <View style={{ padding: 30 }}>
    {/* Seu conteúdo aqui */}
  </View>
</Page>
```

## 🎨 Opções de Customização

### 1. Cor personalizada
```tsx
{renderMargin({ color: "#FF6B6B" })}  // Vermelho
{renderMargin({ color: "#4ECDC4" })}  // Turquesa
{renderMargin({ color: "#95E1D3" })}  // Verde água
{renderMargin({ color: "#FFD93D" })}  // Amarelo
```

### 2. Espessura da borda
```tsx
{renderMargin({ thickness: 10 })}   // Fina
{renderMargin({ thickness: 15 })}   // Média (padrão)
{renderMargin({ thickness: 20 })}   // Grossa
```

### 3. Padrões decorativos
```tsx
{renderMargin({ pattern: "solid" })}        // Apenas bordas (padrão)
{renderMargin({ pattern: "dots" })}         // Com bolinhas nos cantos
{renderMargin({ pattern: "stars" })}        // Com estrelas nos cantos
{renderMargin({ pattern: "corner-lines" })} // Com linhas diagonais e etiqueta vermelha
```

### 4. Combinações
```tsx
{renderMargin({ 
  color: "#9B59B6", 
  thickness: 18, 
  pattern: "stars" 
})}
```

## 🎯 Exemplos Práticos

### Página de Atividade Infantil
```tsx
<Page size="A4" style={styles.page}>
  {renderMargin({ color: "#FF6B6B", pattern: "stars" })}
  
  <View style={{ padding: 30 }}>
    <Text style={styles.title}>Atividade de Matemática</Text>
    {/* Conteúdo da atividade */}
  </View>
</Page>
```

### Página de Leitura
```tsx
<Page size="A4" style={styles.page}>
  {renderMargin({ color: "#4A90E2", thickness: 12 })}
  
  <View style={{ padding: 25 }}>
    <Text style={styles.story}>Era uma vez...</Text>
  </View>
</Page>
```

### Página de Jogos
```tsx
<Page size="A4" style={styles.page}>
  {renderMargin({ color: "#F39C12", pattern: "dots" })}
  
  <View style={{ padding: 30 }}>
    {/* Conteúdo do jogo */}
  </View>
</Page>
```

### Página com Design Elegante (Linhas Diagonais)
```tsx
<Page size="A4" style={styles.page}>
  {renderMargin({ color: "#8B7355", thickness: 5, pattern: "corner-lines" })}
  
  <View style={{ padding: 30 }}>
    {/* Conteúdo da página */}
  </View>
</Page>
```

## 🎨 Paleta de Cores Sugeridas

```tsx
// Cores educacionais
"#4A90E2"  // Azul calmo
"#50C878"  // Verde esmeralda
"#FF6B6B"  // Vermelho coral
"#F39C12"  // Laranja
"#9B59B6"  // Roxo
"#1ABC9C"  // Turquesa
"#E74C3C"  // Vermelho vivo
"#3498DB"  // Azul céu
```

## ⚠️ Importante

- O componente usa `position: absolute`, então o conteúdo da página deve ter padding adequado
- Recomendado: `padding: 25-35` para não sobrepor a borda
- A borda ocupa toda a área da página (de borda a borda)
