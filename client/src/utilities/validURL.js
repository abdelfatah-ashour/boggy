import {
  BRAND_OF_CLOTHES,
  BRAND_OF_LAPTOPS,
  BRAND_OF_MOBILES,
} from "./globalStatement";

// valid url of categories
export function validCategoriesUrl(category) {
  const categories = ["laptops-and-mobiles", "clothes"];
  if (categories.includes(category)) {
    return true;
  } else {
    return false;
  }
}

// valid url of sections
export function validSectionsUrl(category, section) {
  const categories = ["laptops-and-mobiles", "clothes"];
  const sections = ["laptops", "mobiles", "women", "men", "girls", "boys"];
  if (categories.includes(category) && sections.includes(section)) {
    return true;
  } else {
    return false;
  }
}

// valid url of brands
export function validBrandsUrl(category, section, brand) {
  const categories = ["laptops-and-mobiles", "clothes"];
  const sections = ["laptops", "mobiles", "women", "men", "girls", "boys"];

  if (
    (categories.includes(category) &&
      sections.includes(section) &&
      BRAND_OF_MOBILES.includes(brand)) ||
    BRAND_OF_CLOTHES.includes(brand) ||
    BRAND_OF_LAPTOPS.includes(brand)
  ) {
    return true;
  } else {
    return false;
  }
}
