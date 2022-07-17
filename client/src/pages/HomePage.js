import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import HomeBanner from "components/HomeBanner";

import MainCard from "components/MainCard";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";

const HomePage = () => {
  const isUserAuth = userAuth();

  return (
    <Box component="span" sx={{ p: 0 }}>
      <Paper elevation={3} className="MuiPaper-rounded">
        <HomeBanner />
      </Paper>
    </Box>
  );
};

export default HomePage;
