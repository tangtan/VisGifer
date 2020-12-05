import Histogram from "./v_comps/histogram";

export default function visTypeParser(vConfig) {
  switch (vConfig.visualization) {
    case Histogram.name:
      return Histogram.visualization;
    default:
      return Histogram.visualization;
  }
}
