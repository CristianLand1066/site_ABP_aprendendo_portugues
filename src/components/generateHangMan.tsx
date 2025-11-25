import { View, Image } from "@react-pdf/renderer";

export function generateHangman() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
      }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <View
          key={i}
          style={{
            width: "40%",
            marginBottom: 15,
            marginHorizontal: 10,
            alignItems: "center",
            border: "1px solid #000",
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