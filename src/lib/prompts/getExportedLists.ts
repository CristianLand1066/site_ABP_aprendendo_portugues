import storyPrompts from "./story";
import objects from "./objects";
import memoryPairs from "./memoryPairs";
import dominoGame from "./dominoGame";
import wordsCrds from "./wordsCrds";
import wordSearch from "./wordSearch";
import generalExports from "./generalExports";

const storyList = storyPrompts;
const objectsList = objects;
const memoryPairsList = memoryPairs;
const dominoGameList = dominoGame;
const wordsCrdsList = wordsCrds;
const wordSearchList = wordSearch;
const generalExportsList = generalExports;

export default function getExportedLists() {
  return { storyList, objectsList, memoryPairsList, dominoGameList, wordsCrdsList, wordSearchList, generalExportsList };
}
