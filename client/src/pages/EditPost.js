import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import EditPostForm from "components/EditPostForm";
import MainCard from "components/MainCard";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const EditPost = () => {
  const isUserAuth = userAuth();

  return (
    <>
      <MainCard>
        <Box sx={{ p: 2 }}>
          <Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <EditPostForm />
            </Stack>
          </Stack>
        </Box>
      </MainCard>
    </>
  );
};

export default EditPost;
