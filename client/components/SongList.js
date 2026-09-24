import React from "react";
import Spinner from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// Defined the query outside the component (best practice)
const FETCH_SONGS = gql`
  query FetchSongs {
    songs {
      id
      title
    }
  }
`;

// Custom styled row targeting alternating types
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // Uses the built-in theme hover/action color (light gray)
    backgroundColor: theme.palette.action.hover,
  },
  // Hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SongList = () => {
  // Execute the query inside the component using the hook
  const { loading, error, data } = useQuery(FETCH_SONGS);

  if (loading)
    return (
      <Spinner size="30px" aria-label="Loading…">
        Loading songs...
      </Spinner>
    );
  if (error) return <Typography sx={{ p: 2, color: "error.main" }}>Error: {error.message}</Typography>;

  return (
    <Box sx={{ padding: 2, boxShadow: 3, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Song List
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.songs?.map((song) => (
              <StyledTableRow key={song.id} className="song-row">
                <TableCell>{song.title}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SongList;
