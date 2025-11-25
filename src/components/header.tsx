import { View, Text } from "@react-pdf/renderer";
import type { i18n as I18nType } from "i18next";

interface RenderHeaderProps {
  i18n: I18nType;
  locale: string;
  top: boolean;
  name: boolean;
  turma: boolean;
  date: boolean;
  idade: boolean;
  paisOrigem: boolean;
}

export function renderHeader({ i18n, locale, top, name, turma, date, idade, paisOrigem }: RenderHeaderProps) {
  const tPt = i18n.getFixedT("pt");
  const t = i18n.getFixedT(locale);

  return (
    <View
      style={{
        ...(top && { position: "absolute", top: 10, left: 10, right: 10 }),
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        fontSize: 11,
        fontFamily: "Helvetica",
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      {/* Nome */}
      {name && (
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
            }}
        >
            <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.nome")}</Text>
            {locale !== "pt" && (
            <Text style={{ color: "#666", fontSize: 9 }}>
                ({t("pdf.header.nome")})
            </Text>
            )}
            <Text style={{ marginLeft: 4 }}>:</Text>
            <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
            ____________________________________________________________
            </Text>
        </View>
      )}

      {/* Turma */}
      {turma && (
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
            }}
        >
            <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.turma")}</Text>
            {locale !== "pt" && (
            <Text style={{ color: "#666", fontSize: 9 }}>
                ({t("pdf.header.turma")})
            </Text>
            )}
            <Text style={{ marginLeft: 4 }}>:</Text>
            <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
            ____________________________________________________________
            </Text>
        </View>
      )}

      {/* Data */}
      {date && (
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            }}
        >
            <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.data")}</Text>
            {locale !== "pt" && (
            <Text style={{ color: "#666", fontSize: 9 }}>
                ({t("pdf.header.data")})
            </Text>
            )}
            <Text style={{ marginLeft: 4 }}>:</Text>
            <Text style={{ marginLeft: 4, letterSpacing: 1 }}>____/____/_____</Text>
        </View>
      )}

      {/* Idade */}
      {idade && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.idade")}</Text>
          {locale !== "pt" && (
            <Text style={{ color: "#666", fontSize: 9 }}>
              ({t("pdf.header.idade")})
            </Text>
          )}
          <Text style={{ marginLeft: 4 }}>: </Text>
          <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
            ____________________________________________________________
          </Text>
        </View>
      )}

      {/* País de origem */}
      {paisOrigem && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.paisOrigem")}</Text>
          {locale !== "pt" && (
            <Text style={{ color: "#666", fontSize: 9 }}>
              ({t("pdf.header.paisOrigem")})
            </Text>
          )}
          <Text style={{ marginLeft: 4 }}>: </Text>
          <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
            ___________________________________________________
          </Text>
        </View>
      )}
    </View>
  );
}
