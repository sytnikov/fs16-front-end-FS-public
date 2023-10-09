import { AppState } from "../store";

const getFilteredProducts = (state: AppState, search: string, category: string) => {
  return (
    state.productsReducer.products.filter((p) => {
      const matchesCategory = !category || p.category.id === Number(category);
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    }))
};

export default getFilteredProducts
