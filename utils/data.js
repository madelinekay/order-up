const makeItem = (name, price, options = []) => ({
  name,
  price,
  options,
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
  makeOption("WR", 0, "rice"),
  makeOption("BR", 1, "rice"),
  makeOption("Extra meat", 2, "extras"),
  makeOption("Extra veggies", 2, "extras"),
];

const noodleFrOptions = [
  makeOption("C", 0, "protein"),
  makeOption("P", 0, "protein"),
  makeOption("T", 0, "protein"),
  makeOption("TE", 1, "protein"),
  makeOption("B", 1, "protein"),
  makeOption("S", 1, "protein"),
  makeOption("Extra meat", 2, "extras"),
  makeOption("Extra veggies", 2, "extras"),
];

const data = {
  appetizers: [
    makeItem("crab RANGOON", 8.95),
    makeItem("fresh ROLL", 3, [
      makeOption("SHRIMP CHICKEN", 0, "protein"),
      makeOption("TOFU", 0, "protein"),
    ]),
    makeItem("thai spring ROLLS", 6.95, [
      makeOption("VEGGIE", 0, "protein"),
      makeOption("MEAT", 0, "protein"),
    ]),
    makeItem("SATAY chicken", 9.95),
    makeItem("bangkok CREPE", 11.95),
    makeItem("kahlee PUFFS", 9.95),
    makeItem("vegetarian PLEASER/ fried tofu", 8.95),
  ],
  salad: [
    makeItem("Beef or Pork SALAD", 12.95, [
      makeOption("Beef", 0, "protein"),
      makeOption("Pork", 0, "protein"),
    ]),
    makeItem("spicy chicken salad SALAD C", 11.95),
    makeItem("Bean Thread Salad", 11.5),
    makeItem("SQuid SALAD", 12.95),
    makeItem("SEAFOOD SALAD", 12.95),
  ],
  soup: [
    makeItem("TOM YUM", 10.95, [
      makeOption("chicken", 0, "protein"),
      makeOption("shrimp", 0, "protein"),
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 4, "size"),
    ]),
    makeItem("tom KA KAI", 11.95, [
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 4, "size"),
    ]),
    makeItem("SEAFOOD COMBO soup", 12.95, [
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 3, "size"),
    ]),
    makeItem("TOM KA TALAY", 13.95, [
      makeOption("bowl", 0, "size"),
      makeOption("firepot", 3, "size"),
    ]),
    makeItem("Bean Thread SOUP", 11.95),
    makeItem("WONTON soup", 11.95),
  ],
  entree: [
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
      makeOption("WR", 0, "rice"),
      makeOption("BR", 1, "rice"),
      makeOption("extra meat", 2, "extras"),
      makeOption("extra veggies", 2, "extras"),
    ]),
    makeItem("Ginger stir fry", 11.95, entreeCurryOptions),
    makeItem("meat with BROCColi", 11.95, entreeCurryOptions),
    makeItem("THAI Sweet + Sour", 11.95, entreeCurryOptions),
    makeItem("fresh ORANGE pineapple chicken", 12.95, entreeCurryOptions),
    makeItem("STIR FRIED beef", 12.95, [
      makeOption("WR", 0, "rice"),
      makeOption("BR", 1, "rice"),
      makeOption("extra meat", 2, "extras"),
      makeOption("extra veggies", 2, "extras"),
    ]),
  ],
  curries: [
    makeItem("tropical JADE", 15.95, entreeCurryOptions),
    makeItem("Y curry with fish", 15.95, [
      makeOption("Chicken", -4, "protein"),
      makeOption("Pork", -4, "protein"),
      makeOption("Tofu", -4, "protein"),
      makeOption("TEmpeh", -3, "protein"),
      makeOption("Beef", -3, "protein"),
      makeOption("Shrimp", -3, "protein"),
      makeOption("WR", 0, "rice"),
      makeOption("BR", 1, "rice"),
      makeOption("Extra meat", 2, "extras"),
      makeOption("Extra veggies", 2, "extras"),
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
    makeItem("honey walnut PRAWNS", 15.95),
    makeItem("PAD TALAY", 15.95),
    makeItem("Shrimp in a CLAY POT", 12.95),
    makeItem("SPICY SHRIMP", 12.95),
    makeItem("SPICY SQuid", 12.95),
  ],
  noodle: [
    makeItem("East meets West NOODLES", 13.95, noodleFrOptions),
    makeItem("PAD THAI", 11.95, noodleFrOptions),
    makeItem("BANGKOK Pad SEE iew", 11.95, noodleFrOptions),
    makeItem("Chili Basil Noodles /pad kee mao", 11.95, noodleFrOptions),
    makeItem("RAINBOW noodles", 12.95, noodleFrOptions),
    makeItem("KAO SOI noodles", 11.95, noodleFrOptions),
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

module.exports = data;
// export default data;
