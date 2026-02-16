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

const UserDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { users, fetchUserById } = useStore();

  const user = users.byId[id];

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  if (users.loading || !user) {
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
          onClick={() => router.push("/users")}
        >
          Back to Users
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
          {/* Image */}
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={user.image}
              alt={user.firstName}
              sx={{
                borderRadius: "50%",
                width: 250,
                height: 250,
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
          </Grid>

          {/* Info */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography mb={2}>
              <strong>Email:</strong> {user.email}
            </Typography>

            <Typography mb={2}>
              <strong>Phone:</strong> {user.phone}
            </Typography>

            <Typography mb={2}>
              <strong>Gender:</strong> {user.gender}
            </Typography>

            <Typography mb={2}>
              <strong>Company:</strong> {user.company?.name || "N/A"}
            </Typography>

            <Typography>
              <strong>Address:</strong>{" "}
              {user.address
                ? `${user.address.address}, ${user.address.city}, ${user.address.state}`
                : "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserDetailPage;
