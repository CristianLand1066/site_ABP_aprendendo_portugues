import { View, Text } from "@react-pdf/renderer";

export function renderGrid(grid: string[][], styles: any, color?: string) {
  return (
    <View style={styles.bingoGrid}>
      {grid.map((row, r) => (
        <View key={r} style={styles.bingoRow}>
          {row.map((cell, c) => (
            <View
              key={c}
              style={[
                styles.bingoCell,
                color && { borderColor: color, borderWidth: 2 },
              ]}
            >
              <Text style={[styles.bingoText, color && { color }]}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
