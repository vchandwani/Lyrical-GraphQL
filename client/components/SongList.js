import React from "react";
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

const SongList = () => {
  // Execute the query inside the component using the hook
  const { loading, error, data } = useQuery(FETCH_SONGS);

  if (loading) return <Typography sx={{ p: 2 }}>Loading songs...</Typography>;
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
              <TableRow key={song.id}>
                <TableCell>{song.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SongList;
