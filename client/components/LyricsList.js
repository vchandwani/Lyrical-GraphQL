import React from "react";
import { Grid, Box } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

const LyricsList = ({ lyrics }) => {
  return (
    <Grid item container xs={12}>
      {lyrics?.map((lyric) => (
        <Box
          key={lyric.id}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingY: 1,
            border: "1px solid #000123",
            borderRadius: 1,
            padding: 1,
            marginBottom: 1,
          }}
        >
          <Grid item xs={10}>
            {lyric.content}
          </Grid>
          <Grid item xs={2}>
            <ThumbUpOutlinedIcon fontSize="small" fill="red" sx={{ color: lyric.likes && "#181c1b" }} />
          </Grid>
        </Box>
      ))}
    </Grid>
  );
};

export default LyricsList;
