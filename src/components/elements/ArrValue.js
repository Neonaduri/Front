import healing from "../../static/images/icon/healing.png";
import fire from "../../static/images/icon/fire.png";
import pet from "../../static/images/icon/pet.png";
import food from "../../static/images/icon/food.png";
import hotel from "../../static/images/icon/hotel.png";
import activity from "../../static/images/icon/activity.png";
import etc from "../../static/images/icon/etc.png";

const area = [
  "서울",
  "부산",
  "여수",
  "강릉",
  "전주",
  "경주",
  "제주",
  "안동",
  "기타",
];
const theme1 = [
  {
    src: healing,
    value: "힐링",
  },
  {
    src: pet,
    value: "애견동반",
  },
  {
    src: food,
    value: "맛집",
  },
  {
    src: hotel,
    value: "호캉스",
  },
];

const theme2 = [
  {
    src: activity,
    value: "액티비티",
  },
  {
    src: fire,
    value: "캠핑",
  },
  {
    src: etc,
    value: "기타",
  },
];

const theme = [
  "힐링",
  "애견동반",
  "맛집",
  "호캉스",
  "액티비티",
  "캠핑",
  "기타",
];

const keywordSuggestList = ["강릉", "제주도", "워터파크", "힐링", "가족여행"];

export { area, theme1, theme2, keywordSuggestList, theme };
