"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Grid, TextField, CircularProgress, Button, FormControl, InputLabel, Select, MenuItem, Pagination } from "@mui/material";
import { useProductsStore } from "@/store/productsStore";
import Link from "next/link";

// Memoized product card
const ProductCard = React.memo(({ product }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          overflow: "hidden",
          cursor: "pointer",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <img src={product.thumbnail} alt={product.title} style={{ width: "100%", height: 180, objectFit: "cover" }} />
        <Box p={2}>
          <Typography variant="h6">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">${product.price}</Typography>
          <Typography variant="body2" color="text.secondary">Rating: {product.rating}</Typography>
        </Box>
      </Box>
    </Link>
  </Grid>
));

export default function ProductsPage() {
  const { products, total, fetchProducts } = useProductsStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 9; // products per page

  const loadProducts = useCallback(async () => {
    setLoading(true);
    await fetchProducts({ search, category, page, limit });
    setLoading(false);
  }, [search, category, page, fetchProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productCards = useMemo(
    () => (products || []).map((p) => <ProductCard key={p.id} product={p} />),
    [products]
  );

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Products</Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Search Products"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="smartphones">Smartphones</MenuItem>
            <MenuItem value="laptops">Laptops</MenuItem>
            <MenuItem value="fragrances">Fragrances</MenuItem>
          </Select>
        </FormControl>

        <Button component={Link} href="/dashboard" variant="outlined" color="primary">
          Dashboard
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (products || []).length === 0 ? (
        <Typography mt={3}>No products found.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>{productCards}</Grid>

          {total > limit && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(total / limit)}
                page={page}
                onChange={(e, val) => setPage(val)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
