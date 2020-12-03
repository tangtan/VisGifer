import progressBar from "./v_comps/progressBar";
import wordle from "./v_comps/wordle";
import liquidFill from "./v_comps/liquidFill";
import numberIncreasing from "./v_comps/numberIncreasing";
import icon from "./v_comps/icon";
import chatbubble from "./v_comps/chatbubble";
import accumulationIcon from "./v_comps/accumulationIcon";
import rateBar from "./v_comps/rateBar";
import priceLine from "./v_comps/priceLine";
import priceBarVertical from "./v_comps/priceBarVertical";
import priceBarHorizontal from "./v_comps/priceBarHorizontal";
import priceBarTriangle from "./v_comps/priceBarTriangle";
import priceGauge from "./v_comps/priceGauge";
import priceLineArc from "./v_comps/priceLineArc";
import NobelRadialBar from "./v_comps/NobelRadialBar";
import majorTriangle from "./v_comps/majorTriangle";
import studentNumScrollBar from "./v_comps/studentNumScrollBar";
import studentNationHist from "./v_comps/studentNationHist";
import studentGenderGuide from "./v_comps/studentGenderGuide";
import graduateEmployedBar from "./v_comps/graduateEmployedBar";
import studentNationBubble from "./v_comps/studentNationBubble";
import donationFilletColumn from "./v_comps/donationFilletColumn";
import libraryLine from "./v_comps/libraryLine";
import chocolateInterestWaffle from "./v_comps/chocolateInterestWaffle";
import chocolateNutritionPetal from "./v_comps/chocolateNutritionPetal";
import chocolateReviewBar from "./v_comps/chocolateReviewBar";
import chocolateSize from "./v_comps/chocolateSize";
import reviewPercentAccumulationIcon from "./v_comps/reviewPercentAccumulationIcon";
import salesPunchCard from "./v_comps/salesPunchCard";
import revGauge from "./v_comps/revGauge";
import powerStackRound from "./v_comps/powerStackRound";
import donationFilletColumn4Nobel from "./v_comps/donationFilletColumn4Nobel";
import salesArea from "./v_comps/salesArea";
import dotHeight from "./v_comps/dotHeight";
import dotSize from "./v_comps/dotSize";
import donut from "./v_comps/donut";
import pieFlower from "./v_comps/pieFlower";
import lineSmooth from "./v_comps/lineSmooth";
import lineArea from "./v_comps/lineArea";
import barHorizontalRound from "./v_comps/barHorizontalRound";
import barHorizontalRect from "./v_comps/barHorizontalRect";
import barVerticalRound from "./v_comps/barVerticalRound";
import barVerticalRect from "./v_comps/barVerticalRect";
import barDot from "./v_comps/barDot";
import barRadial from "./v_comps/barRadial";
import barStar from "./v_comps/barStar";
import barBoard from "./v_comps/barBoard";
import barTriangle from "./v_comps/barTriangle";
import barDivide from "./v_comps/barDivide";
import barThumb from "./v_comps/barThumb";
import barLineDot from "./v_comps/barLineDot";
import wordCloud from "./v_comps/wordCloud";

export default function visTypeParser(vConfig) {
  let vis = undefined;
  switch (vConfig.visualization) {
    case "donut":
      vis = donut;
      break;
    case "dotHeight":
      vis = dotHeight;
      break;
    case "dotSize":
      vis = dotSize;
      break;
    case "pieFlower":
      vis = pieFlower;
      break;
    case "lineSmooth":
      vis = lineSmooth;
      break;
    case "lineArea":
      vis = lineArea;
      break;
    case "barHorizontalRound":
      vis = barHorizontalRound;
      break;
    case "barHorizontalRect":
      vis = barHorizontalRect;
      break;
    case "barVerticalRect":
      vis = barVerticalRect;
      break;
    case "barVerticalRound":
      vis = barVerticalRound;
      break;
    case "barDot":
      vis = barDot;
      break;
    case "barRadial":
      vis = barRadial;
      break;
    case "barStar":
      vis = barStar;
      break;
    case "barBoard":
      vis = barBoard;
      break;
    case "barTriangle":
      vis = barTriangle;
      break;
    case "barDivide":
      vis = barDivide;
      break;
    case "barThumb":
      vis = barThumb;
      break;
    case "barLineDot":
      vis = barLineDot;
      break;
    case "wordCloud":
      vis = wordCloud;
      break;
    case "progressBar":
      vis = progressBar;
      break;
    case "liquidFill":
      vis = liquidFill;
      break;
    case "numberIncreasing":
      vis = numberIncreasing;
      break;
    case "wordle":
      vis = wordle;
      break;
    case "icon":
      vis = icon;
      break;
    case "chatbubble":
      vis = chatbubble;
      break;
    case "accumulationIcon":
      vis = accumulationIcon;
      break;
    case "rateBar":
      vis = rateBar;
      break;
    case "priceLine":
      vis = priceLine;
      break;
    case "priceBarVertical":
      vis = priceBarVertical;
      break;
    case "priceBarHorizontal":
      vis = priceBarHorizontal;
      break;
    case "priceBarTriangle":
      vis = priceBarTriangle;
      break;
    case "priceGauge":
      vis = priceGauge;
      break;
    case "priceLineArc":
      vis = priceLineArc;
      break;
    case "NobelRadialBar":
      vis = NobelRadialBar;
      break;
    case "majorTriangle":
      vis = majorTriangle;
      break;
    case "studentNumScrollBar":
      vis = studentNumScrollBar;
      break;
    case "studentNationHist":
      vis = studentNationHist;
      break;
    case "studentGenderGuide":
      vis = studentGenderGuide;
      break;
    case "graduateEmployedBar":
      vis = graduateEmployedBar;
      break;
    case "studentNationBubble":
      vis = studentNationBubble;
      break;
    case "donationFilletColumn":
      vis = donationFilletColumn;
      break;
    case "libraryLine":
      vis = libraryLine;
      break;
    case "chocolateInterestWaffle":
      vis = chocolateInterestWaffle;
      break;
    case "chocolateNutritionPetal":
      vis = chocolateNutritionPetal;
      break;
    case "chocolateReviewBar":
      vis = chocolateReviewBar;
      break;
    case "chocolateSize":
      vis = chocolateSize;
      break;
    case "reviewPercentAccumulationIcon":
      vis = reviewPercentAccumulationIcon;
      break;
    case "salesPunchCard":
      vis = salesPunchCard;
      break;
    case "revGauge":
      vis = revGauge;
      break;
    case "powerStackRound":
      vis = powerStackRound;
      break;
    case "donationFilletColumn4Nobel":
      vis = donationFilletColumn4Nobel;
      break;
    case "salesArea":
      vis = salesArea;
      break;

    default:
      console.error("Unrecognizable visualizaiton.");
  }
  return vis;
}
