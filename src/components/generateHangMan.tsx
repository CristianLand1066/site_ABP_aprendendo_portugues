import { View, Image } from "@react-pdf/renderer";

export function generateHangman() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // garante espaçamento entre as colunas
        marginTop: 20,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: "48%", // 2 por linha
            marginBottom: 20,
            alignItems: "center",
            border: "1px solid #000", // opcional: caixa delimitadora
            padding: 10,
          }}
        >
          <Image
            src={"/imagens/forca.png"}
            style={{ width: 200, height: 150, objectFit: "contain" }}
          />
        </View>
      ))}
    </View>
  );
}