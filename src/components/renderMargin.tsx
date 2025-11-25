// src/components/renderMargin.tsx
import React from "react";
import { View } from "@react-pdf/renderer";

interface RenderMarginProps {
  color?: string;
  thickness?: number;
  pattern?: "solid" | "dots" | "stars" | "flowers" | "corner-lines";
}

/**
 * Componente de borda decorativa para páginas do PDF
 * Uso: Envolva o conteúdo da página com este componente
 * 
 * @example
 * <Page size="A4" style={styles.page}>
 *   {renderMargin({ color: "#4A90E2", pattern: "stars" })}
 *   <View style={{ padding: 20 }}>
 *     // Seu conteúdo aqui
 *   </View>
 * </Page>
 */
export function renderMargin({
  color = "#4A90E2",
  thickness = 15,
  pattern = "solid"
}: RenderMarginProps = {}) {
  
  // Estilo base da borda
  const borderStyle = {
    position: "absolute" as const,
    backgroundColor: color,
  };

  // Padrões decorativos
  const decorativeElements: React.ReactElement[] = [];
  
  if (pattern === "dots") {
    // Adiciona bolinhas decorativas nos cantos
    const dotSize = 8;
    const dotPositions = [
      { top: thickness + 5, left: thickness + 5 },
      { top: thickness + 5, right: thickness + 5 },
      { bottom: thickness + 5, left: thickness + 5 },
      { bottom: thickness + 5, right: thickness + 5 },
    ];
    
    dotPositions.forEach((pos, idx) => {
      decorativeElements.push(
        <View
          key={`dot-${idx}`}
          style={{
            position: "absolute",
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
            opacity: 0.6,
            ...pos,
          }}
        />
      );
    });
  }

  if (pattern === "stars") {
    // Adiciona estrelas nos cantos
    const starSize = 12;
    const starPositions = [
      { top: thickness - 6, left: thickness - 6 },
      { top: thickness - 6, right: thickness - 6 },
      { bottom: thickness - 6, left: thickness - 6 },
      { bottom: thickness - 6, right: thickness - 6 },
    ];
    
    starPositions.forEach((pos, idx) => {
      decorativeElements.push(
        <View
          key={`star-${idx}`}
          style={{
            position: "absolute",
            width: starSize,
            height: starSize,
            backgroundColor: "#FFD700",
            transform: "rotate(45deg)",
            ...pos,
          }}
        />
      );
    });
  }

  if (pattern === "corner-lines") {
    // Adiciona linhas diagonais no canto superior esquerdo
    const lineCount = 3;
    const lineSpacing = 25;
    const lineLength = 200;
    
    for (let i = 0; i < lineCount; i++) {
      decorativeElements.push(
        <View
          key={`line-${i}`}
          style={{
            position: "absolute",
            top: thickness + 80 + (i * lineSpacing),
            left: thickness,
            width: lineLength - (i * 30),
            height: 1.5,
            backgroundColor: "#8B7355",
            opacity: 0.4,
            transform: "rotate(-25deg)",
            transformOrigin: "left top",
          }}
        />
      );
    }
  }

  return (
    <>
      {/* Borda Superior */}
      <View
        style={{
          ...borderStyle,
          top: 0,
          left: 0,
          right: 0,
          height: thickness,
        }}
      />

      {/* Borda Inferior */}
      <View
        style={{
          ...borderStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: thickness,
        }}
      />

      {/* Borda Esquerda */}
      <View
        style={{
          ...borderStyle,
          top: 0,
          bottom: 0,
          left: 0,
          width: thickness,
        }}
      />

      {/* Borda Direita */}
      <View
        style={{
          ...borderStyle,
          top: 0,
          bottom: 0,
          right: 0,
          width: thickness,
        }}
      />

      {/* Elementos decorativos nos cantos */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: thickness * 2,
          height: thickness * 2,
          borderBottomRightRadius: thickness * 2,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: thickness * 2,
          height: thickness * 2,
          borderBottomLeftRadius: thickness * 2,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: thickness * 2,
          height: thickness * 2,
          borderTopRightRadius: thickness * 2,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: thickness * 2,
          height: thickness * 2,
          borderTopLeftRadius: thickness * 2,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />

      {/* Padrões decorativos adicionais */}
      {decorativeElements}
    </>
  );
}
