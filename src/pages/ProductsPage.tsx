import { useEffect, useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
  const categories = useAppSelector(
    (state) => state.categoriesReducer.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    dispatch(fetchAllCategoriesAsync());
  }, []);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search, category)
  );

  const [sortDirection, setSortDirection] = useState("asc");
  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  const totalProducts = filteredProducts.length;
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <Box>
      <Box>
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
              <InputLabel id="demo-simple-select-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
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
            <InputLabel id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
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
              <Box>
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
    </Box>
  );
};

export default ProductsPage;
