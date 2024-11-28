import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Stack,
  Card,
  CardMedia,
} from "@mui/material";
import axios from "axios";

interface Breed {
  id: string;
  name: string;
}

interface CatInfo {
  id: string;
  url: string;
  breeds: Breed[];
}

const Catinfo: React.FC = () => {
  const [catinfo, setCatinfo] = useState<CatInfo[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;

  const fetchBreeds = async () => {
    try {
      const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
        headers: {
          "x-api-key": import.meta.env.APIKEY,
        },
      });
      setBreeds(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCatinfo = async () => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=100&breed_ids=${selectedBreed}`,
        {
          headers: {
            "x-api-key": import.meta.env.APIKEY,
          },
        }
      );
      setCatinfo(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      fetchCatinfo();
    }
  }, [selectedBreed]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedData = catinfo.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ color: "black", padding: "20px", textAlign: "center" }}
      >
        The Cats
      </Typography>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "20%",
            padding: "20px",
          }}
        >
          <FormControl sx={{ minWidth: 250, marginBottom: "20px" }}>
            <InputLabel id="breed-select-label">Breed</InputLabel>
            <Select
              labelId="breed-select-label"
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value as string)}
            >
              {breeds.map((breed) => (
                <MenuItem key={breed.id} value={breed.id}>
                  {breed.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            padding: "20px",
          }}
        >
          {selectedBreed ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "20px",
                  padding: "20px",
                }}
              >
                {paginatedData.map((cat) => (
                  <Card key={cat.id} sx={{ width: "200px", height: "200px" }}>
                    <CardMedia
                      component="img"
                      image={cat.url}
                      alt={cat.breeds && cat.breeds[0] ? cat.breeds[0].name : "Cat"}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Card>
                ))}
              </Box>
              {totalPages > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      shape="rounded"
                    />
                  </Stack>
                </Box>
              )}
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: "grey",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Cats are known for their captivating personalities, making them
                one of the most popular pets worldwide. With their graceful
                movements, playful antics, and independent nature, they bring
                joy and comfort to any home. Some cats are highly energetic and
                love to explore their surroundings, while others are content to
                relax and cuddle with their owners. Their unique appearance,
                from sleek and slender to robust and fluffy, adds to their
                charm. Whether they enjoy interacting with family members or
                prefer their own quiet space, cats can be the perfect companion
                for any household.
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: "grey",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Please select a breed to see the images.
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Catinfo;