import { useEffect, useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
    dispatch(fetchAllProductsAsync({ offset: 0, limit: 300 }));
    dispatch(fetchAllCategoriesAsync());
  }, []);

  // filtering by category and searching by title
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const filteredProducts = useAppSelector((state) =>
    getFilteredProducts(state, search, category)
  );

  // sorting products by price
  const [sortDirection, setSortDirection] = useState("asc");
  const onSortToggle = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    dispatch(sortByPrice(newSortDirection));
  };

  const bannerStyle = {
    background:
      'url("https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "32px",
    textAlign: "center",
    color: "white",
  };

  return (
    <Box>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: "32px", minHeight: "50px" }}>
          <Paper elevation={4} sx={bannerStyle}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              WELCOME TO ECO STORE
            </Typography>
          </Paper>
        </Container>
        <Box className="product-filters">
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
                Filter by category
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
        <Box className="product-list">
          {filteredProducts?.map((p) => (
            <Box>
              <ProductCard product={p} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;
