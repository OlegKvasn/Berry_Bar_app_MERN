export const minOrderPrice = 200 as const;

export const category = [
  {
    name: "піцца",
    name_en: "pizza",
    value: "pizza",
    img: "/category/pizza.jpg",
  },
  {
    name: "роли",
    name_en: "sushi",
    value: "sushi",
    img: "/category/sushi.jpg",
  },
  {
    name: "паста",
    name_en: "pasta",
    value: "pasta",
    img: "/category/pasta.jpg",
  },
  {
    name: "салати",
    name_en: "salad",
    value: "salad",
    img: "/category/salad.jpg",
  },
  {
    name: "гриль",
    name_en: "grill",
    value: "grill",
    img: "/category/grill.jpg",
  },
  {
    name: "напої",
    name_en: "drink",
    value: "drink",
    img: "/category/drink.jpg",
  },
] as const;

export const popular = [
  { uk: "Карбонара", en: "Carbonara" },
  { uk: "М'ясна", en: "Meat Pizza" },
  { uk: "Гавайська", en: "Hawaiian Pizza" },
] as const;
