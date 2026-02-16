"use client";

import { Card, CardMedia, CardContent, Typography, CardActionArea, Grid } from "@mui/material";
import Link from "next/link";
import React from "react";

const ProductCard = React.memo(({ product }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardActionArea>
          <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
          <CardContent>
            <Typography variant="h6">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              ${product.price} | Rating: {product.rating}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  </Grid>
));

export default ProductCard;
