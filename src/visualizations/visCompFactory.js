import Histogram from "./v_comps/histogram";
import ShapeShiftingHistogram from "./v_comps/shapeShiftingHistogram";

export default function visCompFactorySelector(vConfig) {
  switch (vConfig.visualization) {
    case Histogram.name:
      return Histogram;
    case ShapeShiftingHistogram.name:
      return ShapeShiftingHistogram;
    default:
      return Histogram;
  }
}
