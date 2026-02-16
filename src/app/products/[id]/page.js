"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Button,
  CardMedia,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { products, fetchProductById } = useStore();

  const product = products.byId[id];

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (products.loading || !product) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      {/* Top Buttons */}
      <Box display="flex" gap={2} mb={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/products")}
        >
          Back to Products
        </Button>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{
                borderRadius: 2,
                objectFit: "contain",
                maxHeight: 400,
                backgroundColor: "#f5f5f5",
              }}
            />
          </Grid>

          {/* Info Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>

            <Typography variant="h5" color="primary" mb={2}>
              ${product.price}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography mb={2}>
              <strong>Category:</strong> {product.category}
            </Typography>

            <Typography mb={2}>
              <strong>Rating:</strong> ⭐ {product.rating}
            </Typography>

            {product.brand && (
              <Typography mb={2}>
                <strong>Brand:</strong> {product.brand}
              </Typography>
            )}

            {product.stock && (
              <Typography mb={2}>
                <strong>Stock:</strong> {product.stock}
              </Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography>
              <strong>Description:</strong>
            </Typography>
            <Typography mt={1}>{product.description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetailPage;
