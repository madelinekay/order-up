const makeItem = (name, price, options = [], time = null) => ({
  name,
  price,
  options,
  time,
});

const makeOption = (name, modifier, type) => ({
  name,
  modifier,
  type,
});

const entreeCurryOptions = [
  makeOption("Chicken", 0, "protein"),
  makeOption("Pork", 0, "protein"),
  makeOption("Tofu", 0, "protein"),
  makeOption("TEmpeh", 1, "protein"),
  makeOption("Beef", 1, "protein"),
  makeOption("Shrimp", 1, "protein"),
  makeOption("No protein/VEG", 0, "protein"),
  makeOption("White", 0, "rice"),
  makeOption("Brown", 1, "rice"),
  makeOption("No rice", 0, "rice"),
  makeOption("PxP", 2, "extras"),
  makeOption("VxV", 2, "extras"),
];

const noodleFrOptions = [
  makeOption("Chicken", 0, "protein"),
  makeOption("Pork", 0, "protein"),
  makeOption("Tofu", 0, "protein"),
  makeOption("TEmpeh", 1, "protein"),
  makeOption("Beef", 1, "protein"),
  makeOption("Shrimp", 1, "protein"),
  makeOption("No protein/VEG", 0, "protein"),
  makeOption("PxP", 2, "extras"),
  makeOption("VxV", 2, "extras"),
];

export const data = {
  appetizers: [
    makeItem("crab RANGOON", 8.95),
    makeItem(
      "fresh ROLL",
      3,
      [
        makeOption("C/S", 0, "protein"),
        makeOption("Chicken", 0, "protein"),
        makeOption("Shrimp", 1, "protein"),
        makeOption("Tofu", 0, "protein"),
        makeOption("No protein/VEG", 0, "protein"),
        makeOption("PxP", 2, "extras"),
        makeOption("VxV", 2, "extras"),
      ],
      0
    ),
    makeItem("thai spring ROLLS", 6.95, [
      makeOption("VEGGIE", 0, "protein"),
      makeOption("MEAT", 0, "protein"),
    ]),
    makeItem("SATAY chicken", 9.95),
    makeItem("bangkok CREPE", 11.95),
    makeItem("kahlee PUFFS", 9.95),
    makeItem("vegetarian PLEASER", 8.95),
  ],
  salads: [
    makeItem("Beef/Pork SALAD", 12.95, [
      makeOption("Beef", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("spicy Chicken SALAD", 11.95, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("Bean Thread Salad", 11.5, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("SQuid SALAD", 12.95, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("SEAFOOD SALAD", 12.95, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
  ],
  soups: [
    makeItem("TOM YUM", 10.95, [
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("TEmpeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 4, "size"),
    ]),
    makeItem("tom KA KAI", 11.95, [
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("TEmpeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("No protein/VEG", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 4, "size"),
    ]),
    makeItem("SEAFOOD COMBO soup", 12.95, [
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 3, "size"),
    ]),
    makeItem("TOM KA TALAY", 13.95, [
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 3, "size"),
    ]),
    makeItem("Bean Thread SOUP", 11.95, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("WONTON soup", 11.95, [
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
  ],
  entrees: [
    makeItem("pad KA-PRAO", 11.95, entreeCurryOptions),
    makeItem("pad PRIK KHING", 11.95, entreeCurryOptions),
    makeItem("spicy EGGPLANT", 11.95, entreeCurryOptions),
    makeItem("chicken in the GRASS", 12.95, entreeCurryOptions),
    makeItem("Yellow TIGER", 12.95, entreeCurryOptions),
    makeItem("pad NOR MAI", 11.95, entreeCurryOptions),
    makeItem("RAMA showers", 11.95, entreeCurryOptions),
    makeItem("FOUR MUSKeteers", 11.95, entreeCurryOptions),
    makeItem("CASHEW chicken", 12.95, entreeCurryOptions),
    makeItem("GARLIC C/P", 12.95, [
      makeOption("chicken", 0, "protein"),
      makeOption("pork", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("Ginger stir fry", 11.95, entreeCurryOptions),
    makeItem("meat with BROCColi", 11.95, entreeCurryOptions),
    makeItem("THAI Sweet + Sour", 11.95, entreeCurryOptions),
    makeItem("ORANGE pineapple Chicken", 12.95, entreeCurryOptions, 15),
    makeItem("STIR FRIED beef", 12.95, [
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
  ],
  curries: [
    makeItem("tropical JADE", 15.95, entreeCurryOptions),
    makeItem("Yellow curry with fish", 15.95, [
      makeOption("Fish", 0, "protein"),
      makeOption("Chicken", -4, "protein"),
      makeOption("Pork", -4, "protein"),
      makeOption("Tofu", -4, "protein"),
      makeOption("TEmpeh", -3, "protein"),
      makeOption("Beef", -3, "protein"),
      makeOption("Shrimp", -3, "protein"),
      makeOption("No protein/VEG", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("the EVERGREEN state curry", 13.95, entreeCurryOptions),
    makeItem("naughty jungle PRINCESS", 12.95, entreeCurryOptions),
    makeItem("Green CURRY", 11.95, entreeCurryOptions),
    makeItem("Red CURRY", 11.95, entreeCurryOptions),
    makeItem("PANANG", 12.95, entreeCurryOptions),
    makeItem("PINEapple CURRY", 11.95, entreeCurryOptions),
    makeItem("MASAMAN curry", 12.95, entreeCurryOptions),
    makeItem("chinese PUMPKIN CURRY", 11.95, entreeCurryOptions),
  ],
  seafood: [
    makeItem("honey walnut PRAWNS", 15.95, [
      makeOption("PxP", 2, "extras"),
      15,
    ]),
    makeItem("PAD TALAY", 15.95),
    makeItem("Shrimp in a CLAY POT", 12.95, [], 15),
    makeItem("SPICY SHRIMP", 12.95),
    makeItem("SPICY SQuid", 12.95),
  ],
  noodles: [
    makeItem("East meets West NOODLES", 13.95, noodleFrOptions),
    makeItem("PAD THAI", 11.95, noodleFrOptions),
    makeItem("BANGKOK/pad SEE EW", 11.95, noodleFrOptions),
    makeItem("CBN/pad kee mao", 11.95, noodleFrOptions),
    makeItem("RAINBOW noodles", 12.95, noodleFrOptions),
    makeItem("KAO SOI noodles", 11.95, [
      makeOption("Chicken", -4, "protein"),
      makeOption("Pork", -4, "protein"),
      makeOption("Tofu", -4, "protein"),
      makeOption("TEmpeh", -3, "protein"),
      makeOption("Beef", -3, "protein"),
      makeOption("Shrimp", -3, "protein"),
      makeOption("No protein/VEG", 0, "protein"),
      makeOption("White", 1, "extras"),
      makeOption("Brown", 2, "extras"),
      makeOption("PxP", 2, "extras"),
      makeOption("VxV", 2, "extras"),
    ]),
    makeItem("MIXED MEATS and bean thread", 13.95),
  ],
  FRice: [
    makeItem("Thai Fried Rice", 11.95, noodleFrOptions),
    makeItem("PINEapple Fried Rice", 12.95, noodleFrOptions),
    makeItem("Chili Basil Fried Rice", 11.95, noodleFrOptions),
    makeItem("Vegetable Fried Rice", 11.95, noodleFrOptions),
    makeItem("MANGO Fried Rice", 12.95, noodleFrOptions),
    makeItem("CHINESE SAUSAGE fried rice", 12.95, noodleFrOptions),
  ],
  sides: [
    makeItem("peanut sauce", 1.5),
    makeItem("brown rice", 2.5),
    makeItem("jasmine rice", 1.5),
  ],
  desserts: [
    makeItem("MANGO sticky rice", 6.95),
    makeItem("BI TOI custard", 6.95),
    makeItem("BLACK sweet RICE pudding", 4.5),
  ],
  drinks: [
    makeItem("THAI Tea", 3),
    makeItem("THAI COFFEE", 3),
    makeItem("iced TEA", 2.5),
    makeItem("can SODA", 1.5),
  ],
};

export const categories = Object.keys(data);

const categoriesTime = {
  appetizers: 10,
  salads: 10,
  soups: 10,
  entrees: 8,
  curries: 10,
  seafood: 10,
  noodles: 7,
  FRice: 7,
  sides: 0,
  desserts: 5,
  drinks: 0,
};

const mutatedData = Object.entries(data).map((arr) => {
  const type = arr[0];
  return arr[1].map((item) => {
    if (item.time !== null) {
      return { ...item, category: type };
    }

    return { ...item, category: type, time: categoriesTime[type] };
  });
});

// const flattenedData = mutatedData.reduce(
//   (acc, nested) => [...acc, ...nested],
//   []
// );

let flattenedData = [];
mutatedData.map((arr) => arr.map((item) => flattenedData.push(item)));

export default flattenedData;
