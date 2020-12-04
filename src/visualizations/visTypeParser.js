import histogram from "./v_comps/histogram";

export default function visTypeParser(vConfig) {
  switch (vConfig.visualization) {
    case "histogram":
      return histogram;
    default:
      return histogram;
  }
}
