import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  Stack,
} from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import {
  fetchAllProductsAsync,
  sortByPrice,
} from "../redux/reducers/productsReducer";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import getFilteredProducts from "../redux/selectors/getFilteredProducts";
import { fetchAllCategoriesAsync } from "../redux/reducers/categoriesReducer";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  
  const filteredProducts = useAppSelector((state) =>
  getFilteredProducts(state, search, category)
  );
  const totalProducts = filteredProducts.length;
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    dispatch(fetchAllCategoriesAsync());
  }, []);

  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{minHeight: "40rem"}}>
      <Box
        className="product-filters"
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
      >
        <Button
          variant="contained"
          onClick={onSortToggle}
          sx={{ minWidth: 200 }}
        >
          Sort by Price:{" "}
          {sortDirection === "desc" ? "Low to High" : "High to Low"}
        </Button>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value="">- All products -</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Search by title"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </Box>
      <Box
        className="product-filters"
        sx={{
          flexGrow: 1,
          ml: 2,
          mr: 2,
          display: { xs: "flex", md: "none" },
        }}
      >
        <Button
          variant="contained"
          onClick={onSortToggle}
          sx={{ height: 55, width: "100%" }}
        >
          Sort by Price:{" "}
          {sortDirection === "desc" ? (
            <ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} />
          ) : (
            <ArrowDownwardRoundedIcon sx={{ fontSize: 16 }} />
          )}
        </Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Search by title"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box className="product-list">
        {filteredProducts
          ?.slice(
            productsPerPage * (currentPage - 1),
            productsPerPage * currentPage
          )
          .map((p) => (
            <Box key={p._id}>
              <ProductCard product={p} />
            </Box>
            
          ))}
      </Box>
      <Stack className="page-element" spacing={2}>
        <Pagination
          count={Math.ceil(totalProducts / productsPerPage)}
          page={currentPage}
          onChange={(e, newPage) => onPageChange(newPage)}
          shape="rounded"
        />
      </Stack>
    </Box>
  );
};

export default ProductsPage;
