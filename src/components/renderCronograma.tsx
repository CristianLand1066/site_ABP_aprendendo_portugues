import { View, Text } from "@react-pdf/renderer";
import type { i18n as I18nType } from "i18next";

interface RenderCronogramaProps {
  i18n: I18nType;
  locale: string;
}

export function renderCronograma({ i18n, locale }: RenderCronogramaProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        borderWidth: 1,
        borderColor: "#000",
        marginTop: 10,
      }}
    >
      {Array.from({ length: 25 }).map((_: unknown, idx: number) => {
        const row = Math.floor(idx / 5);
        const col = idx % 5;

        const isLastRow = row === 4;
        const isLastCol = col === 4;
        const isFirstRow = row === 0;

        return (
          <View
            key={idx}
            style={{
              width: "20%",
              height: 60,
              borderRightWidth: isLastCol ? 0 : 1,
              borderBottomWidth: isLastRow ? 0 : 1,
              borderColor: "#000",
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            {isFirstRow && (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {i18n.getFixedT("pt")(`pdf.cronograma.dias.${col}`)}
                </Text>

                {locale !== "pt" && (
                  <Text
                    style={{
                      fontSize: 10,
                      marginTop: 2,
                      textAlign: "center",
                      fontStyle: "italic",
                      color: "#555",
                    }}
                  >
                    ({i18n.getFixedT(locale)(`pdf.cronograma.dias.${col}`)})
                  </Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}