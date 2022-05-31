const makeItem = (name, price, ingredients, options = [], time = null) => ({
  name,
  price,
  ingredients,
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
  makeOption("Tempeh", 1, "protein"),
  makeOption("Beef", 1, "protein"),
  makeOption("Shrimp", 1, "protein"),
  makeOption("Vegetable", 0, "protein"),
  makeOption("White", 0, "rice"),
  makeOption("Brown", 1, "rice"),
  makeOption("No rice", 0, "rice"),
  makeOption("Extra protein", 2, "extras"),
  makeOption("Extra vegetable", 2, "extras"),
];

const noodleFrOptions = [
  makeOption("Chicken", 0, "protein"),
  makeOption("Pork", 0, "protein"),
  makeOption("Tofu", 0, "protein"),
  makeOption("Tempeh", 1, "protein"),
  makeOption("Beef", 1, "protein"),
  makeOption("Shrimp", 1, "protein"),
  makeOption("Vegetable", 0, "protein"),
  makeOption("Extra protein", 2, "extras"),
  makeOption("Extra vegetable", 2, "extras"),
];

export const data = {
  Appetizers: [
    makeItem("Crab Rangoon", 8.95, ["gluten", "dairy", "shellfish"]),
    makeItem(
      "Fresh Rolls",
      3,
      ["basil", "rice", "fried onion", "carrot", "cucumber", "dipping sauce (peanut + gluten)"],
      [
        makeOption("Chicken/Shrimp", 0, "protein"),
        makeOption("Chicken", 0, "protein"),
        makeOption("Shrimp", 1, "protein"),
        makeOption("Tofu", 0, "protein"),
        makeOption("Vegetable", 0, "protein"),
        makeOption("Extra protein", 1, "extras"),
        makeOption("Extra veggie", 1, "extras"),
      ],
      0
    ),
  ],

  Salads: [
    makeItem("Thai Salad", 12.95, ["soy", "carrot", "cucumber", "basil", "onion", "garlic", "romaine lettuce"], [
      makeOption("Beef", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Extra protein", 1, "extras"),
      makeOption("Extra veggie", 1, "extras"),
    ]),
    makeItem("Spicy Chicken Salad", 11.95, ["soy", "carrot", "cucumber", "basil", "onion", "garlic", "romaine lettuce"], [
      makeOption("Tofu", 0, "protein"),
      makeOption("Chicken", 0, "protein"),
      makeOption("Extra protein", 1, "extras"),
      makeOption("Extra veggie", 1, "extras"),
    ]),
  ],
  Soups: [
    makeItem("Tom Yum", 10.95, ["shellfish", "fish", "tomato", "cilantro", "lime leaf", "ginger", "oyster mushroom", "cabbage", "carrot"], [
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("Tempeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("Vegetable", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("Extra protein", 2, "extras"),
      makeOption("Extra vegetable", 2, "extras"),
      makeOption("Bowl", 0, "size"),
      makeOption("Firepot", 4, "size"),
    ]),
    makeItem("Tom Ka Kai", 11.95, ["shellfish", "fish", "coconut", "cilantro", "lime leaf", "ginger", "oyster mushroom"], [
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("Tempeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("Vegetable", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("Extra protein", 2, "extras"),
      makeOption("Extra vegetable", 2, "extras"),
      makeOption("Bowl", 0, "size"),
      makeOption("Firepot", 4, "size"),
    ]),
  ],
  Entrees: [
    makeItem("Pad Ka-Prao", 11.95, ["oyster sauce", "basil", "soy", "green bean", "garlic", "onion"], entreeCurryOptions),
    makeItem("Pad Prik Khing", 11.95, ["fish sauce", "red curry (prawn)", "green bean", "garlic", "onion"], entreeCurryOptions),
    makeItem("Pad Nor Mai", 11.95, ["fish sauce", "red curry (prawn)", "basil", "bamboo shoots", "garlic", "onion"], entreeCurryOptions),
  ],
  Curries: [
    makeItem("Yellow Curry", 12.95, ["coconut", "lime leaf", "lemongrass", "garlic", "potato", "onion"], [
      makeOption("Fish", 3, "protein"),
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("Tempeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("Vegetable", 0, "protein"),
      makeOption("White", 0, "rice"),
      makeOption("Brown", 1, "rice"),
      makeOption("No rice", 0, "rice"),
      makeOption("Extra protein", 2, "extras"),
      makeOption("Extra vegetable", 2, "extras"),
    ]),
    makeItem("Green Curry", 11.95, ["green curry(shellfish)", "fish sauce", "coconut", "lime leaf", "green bell pepper", "chili", 'eggplant'], entreeCurryOptions),
    makeItem("Red Curry", 11.95, ["red curry (shellfish)", "fish sauce", "coconut", "garlic", "basil", "chili", "bamboo", "lime leaf", "red bell pepper"], entreeCurryOptions),
    makeItem("Panang", 12.95, ["panang curry (shellfish)", "fish sauce", "coconut", "garlic", "basil", "chili", "lime leaf", "red bell pepper"], entreeCurryOptions),
    makeItem("Masaman", 12.95, ["masaman curry (shellfish)", "fish sauce", "coconut", "garlic", "tamarind", "chili", "potato", "carrot", "peanut"], entreeCurryOptions),
  ],
  Seafood: [
    makeItem("Honey Walnut Prawns", 15.95, ["gluten or rice flour", "walnut", "egg", "dairy"], [
      makeOption("Extra protein", 4, "extras"),
      15,
    ]),
    makeItem("Spicy Squid", 12.95, ["fish sauce", "onion", "garlic", "chili", 'soy', "basil", "shallot"]),
  ],
  Noodles: [
    makeItem("Pad Thai", 11.95, ["fish sauce", "egg", "shrimp paste", "tamarind", "shallot", "garlic", "peanut", "tapioca", "carrot"], noodleFrOptions),
    makeItem("Pad Kee Mao", 11.95, ["oyster sauce", "fish sauce", "soy sauce", "garlic", "basil", "oyster mushroom", "red bell pepper"], noodleFrOptions),
    makeItem("Kao Soi", 11.95, ["egg noodle", "yellow curry", "coconut", "cilantro", "shallot", "onion"], [
      makeOption("Chicken", 0, "protein"),
      makeOption("Pork", 0, "protein"),
      makeOption("Tofu", 0, "protein"),
      makeOption("Tempeh", 1, "protein"),
      makeOption("Beef", 1, "protein"),
      makeOption("Shrimp", 1, "protein"),
      makeOption("Vegetable", 0, "protein"),
      makeOption("White", 1, "extras"),
      makeOption("Brown", 2, "extras"),
      makeOption("Extra protein", 2, "extras"),
      makeOption("Extra vegetable", 2, "extras"),
    ]),
  ],
  Rice: [
    makeItem("Thai Fried Rice", 11.95, ["fish sauce", "soy", "egg", "onion", "garlic", "peas", "shallot"], noodleFrOptions),
    makeItem("Pineapple Fried Rice", 12.95, ["fish sauce", "soy", "egg", "pineapple", "onion", "garlic", "peas", "shallot"], noodleFrOptions),
  ],
  Sides: [
    makeItem("Peanut Sauce", 1.5),
    makeItem("Brown Rice", 2.5),
    makeItem("Jasmine Rice", 1.5),
  ],
  Desserts: [
    makeItem("Mango Sticky Rice", 6.95, ["coconut", "rice", "fresh mango"]),
    makeItem("Black Sweet Rice Pudding", 4.5, ["coconut", "rice", "fresh mango"]),
  ],
  Drinks: [
    makeItem("Thai Tea", 3, ["dairy", "coconut (vegan option)"]),
    makeItem("Thai Coffee", 3, ["dairy", "coconut (vegan option)"]),
    makeItem("Iced Tea", 2.5, ["ceylon tea"]),
    makeItem("Soda", 1.5),
  ],
};

export const categories = Object.keys(data);

const categoriesTime = {
  Appetizers: 10,
  Salads: 10,
  Soups: 10,
  Entrees: 8,
  Curries: 10,
  Seafood: 10,
  Noodles: 7,
  Rice: 7,
  Sides: 0,
  Desserts: 5,
  Drinks: 0,
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

let flattenedData = [];
mutatedData.map((arr) => arr.map((item) => flattenedData.push(item)));

export default flattenedData;
