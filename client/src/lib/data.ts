export const minOrderPrice = 200 as const;

export const category = [
  {
    name: "піцца",
    name_en: "pizza",
    value: "pizza",
  },
  {
    name: "бургер",
    name_en: "burger",
    value: "burger",
  },
  {
    name: "паста",
    name_en: "pasta",
    value: "pasta",
  },
  {
    name: "салати",
    name_en: "salad",
    value: "salad",
  },
  {
    name: "гриль",
    name_en: "grill",
    value: "grill",
  },
  {
    name: "напої",
    name_en: "drink",
    value: "drink",
  },
] as const;

export const popular = [
  { uk: "Карбонара", en: "Carbonara" },
  { uk: "М'ясна", en: "Meat Pizza" },
  { uk: "Гавайська", en: "Hawaiian Pizza" },
] as const;
