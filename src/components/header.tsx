import { View, Text } from "@react-pdf/renderer";
import type { i18n as I18nType } from "i18next";

interface RenderHeaderProps {
  i18n: I18nType;
  locale: string;
}

export function renderHeader({ i18n, locale }: RenderHeaderProps) {
  const tPt = i18n.getFixedT("pt");
  const t = i18n.getFixedT(locale);
  
  return (
    <View style={{ 
      marginBottom: 15, 
      paddingHorizontal: 20,
      fontSize: 11,
      fontFamily: "Helvetica"
    }}>
      {/* Nome */}
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 6 
      }}>
        <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.nome")}</Text>
        {locale !== "pt" && (
          <Text style={{ color: "#666", fontSize: 9 }}>({t("pdf.header.nome")})</Text>
        )}
        <Text style={{ marginLeft: 4 }}>:</Text>
        <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
          ____________________________________________________________
        </Text>
      </View>

      {/* Turma */}
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        marginBottom: 6 
      }}>
        <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.turma")}</Text>
        {locale !== "pt" && (
          <Text style={{ color: "#666", fontSize: 9 }}>({t("pdf.header.turma")})</Text>
        )}
        <Text style={{ marginLeft: 4 }}>:</Text>
        <Text style={{ marginLeft: 4, letterSpacing: 0.5 }}>
          ____________________________________________________________
        </Text>
      </View>

      {/* Data */}
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center" 
      }}>
        <Text style={{ fontWeight: "bold" }}>{tPt("pdf.header.data")}</Text>
        {locale !== "pt" && (
          <Text style={{ color: "#666", fontSize: 9 }}>({t("pdf.header.data")})</Text>
        )}
        <Text style={{ marginLeft: 4 }}>:</Text>
        <Text style={{ marginLeft: 4, letterSpacing: 1 }}>
          ____/____/_____
        </Text>
      </View>
    </View>
  );
}