import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  bingo: {
    padding: 0,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  molde: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  domino: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  hangman: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  objectHunt: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  memoryGame: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  storyGame: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  wordSearch: {
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  h1: { fontSize: 24, marginBottom: 6 },
  h2: { fontSize: 18, marginTop: 16, marginBottom: 6 },
  p: { marginBottom: 8, lineHeight: 1.4 },
  list: { marginLeft: 12 },
  caption: {
    marginBottom: 5,
    lineHeight: 1.4,
    fontStyle: "italic",
    fontSize: 10,
    color: "#555",
  },
  captionLabel: {
    fontStyle: "italic",
    fontSize: 8,
    color: "#555",
    fontWeight: 700,
    marginBottom: 2,
  },
  image: { marginTop: 6, marginBottom: 6, alignSelf: "center" },
  //bingo styles
  bingoGrid: { marginTop: 12, gap: 0 },
  bingoRow: { flexDirection: "row" },
  bingoCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bingoText: { fontSize: 10, fontWeight: 500 },
  bingoCard: { marginBottom: 10 },
});