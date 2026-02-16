"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Button } from "@mui/material";
import Link from "next/link";
import { signOut } from "next-auth/react";

const DashboardCard = React.memo(({ title, description, href }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  </Grid>
));

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  // Only render content after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevents hydration mismatch

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Dashboard</Typography>

      <Grid container spacing={3} mb={3}>
        <DashboardCard 
          title="Users" 
          description="View and manage all users" 
          href="/users" 
        />
        <DashboardCard 
          title="Products" 
          description="Browse and manage products" 
          href="/products" 
        />
      </Grid>

      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </Button>
    </Box>
  );
}
