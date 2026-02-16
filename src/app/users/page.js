"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  TextField,
  CircularProgress,
  Pagination,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useUsersStore } from "@/store/usersStore";
import React from "react";

const UserCard = React.memo(({ user }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Link href={`/users/${user.id}`} style={{ textDecoration: "none" }}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={user.image}
          alt={user.firstName}
        />
        <CardContent>
          <Typography variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.gender} | {user.phone}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  </Grid>
));

export default function UsersPage() {
  const { users, total, fetchUsers } = useUsersStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false); // to avoid hydration errors

  const limit = 10;

  // Only render on client
  useEffect(() => setMounted(true), []);

  // Fetch users whenever page or search changes
  useEffect(() => {
    if (!mounted) return;
    setLoading(true);
    fetchUsers(search, page, limit).finally(() => setLoading(false));
  }, [search, page, fetchUsers, mounted]);

  const userCards = useMemo(
    () => users?.map((u) => <UserCard key={u.id} user={u} />) || [],
    [users]
  );

  if (!mounted) return null; // prevent SSR mismatch

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Users
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Dashboard
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : userCards.length === 0 ? (
        <Typography mt={3}>No users found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {userCards}
        </Grid>
      )}

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
    </Box>
  );
}
