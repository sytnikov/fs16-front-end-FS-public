import { AppState } from "../store";

const getFilteredProducts = (state: AppState, search: string, category: string) => {
  return (
    state.productsReducer.products.filter((p) => {
      const matchesCategory = !category || p.categoryId === category; // check the logic
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }))
};

export default getFilteredProducts
