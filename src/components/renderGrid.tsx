import { View, Text } from "@react-pdf/renderer";

export function renderGrid(grid: string[][], styles: any) {
  return (
    <View style={styles.bingoGrid}>
      {grid.map((row, r) => (
        <View key={r} style={styles.bingoRow}>
          {row.map((cell, c) => (
            <View key={c} style={styles.bingoCell}>
              <Text style={styles.bingoText}>{cell}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}