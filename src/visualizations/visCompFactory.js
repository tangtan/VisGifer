import Histogram from "./v_comps/histogram";

export default function visCompFactorySelector(vConfig) {
  switch (vConfig.visualization) {
    case Histogram.name:
      return Histogram;
    default:
      return Histogram;
  }
}
