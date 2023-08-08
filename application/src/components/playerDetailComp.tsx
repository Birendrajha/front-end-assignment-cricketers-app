import React, { useState, useEffect } from "react";
import { usePlayersHooks } from "../customHooks";
import { TMayBe, TPlayer } from "../services";
import { Typography, Box, Avatar, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

export const PlayerDetails = ({
  player,
  onNavigateBack,
  similarPlayer,
  onNavigate,
  getAge,
}: {
  player: TPlayer | undefined;
  onNavigateBack: () => void;
  similarPlayer: TPlayer[] | undefined;
  onNavigate: (p: TPlayer) => void;
  getAge: (dob: any) => number;
}) => {
  return (
    <Box padding={2}>
      <Box
        boxShadow={15}
        id="playerDetail"
        display="flex"
        borderRadius="5px"
        style={{
          background: "linear-gradient(to top left, #3399ff, #99e6ff)",
        }}
      >
        <Box padding={2} width={0.4} display="flex" justifyContent="left">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="180"
              image={player?.profilePic}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Typography variant="h5"> {player?.name}</Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {player?.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box width={0.6} justifyContent="left">
          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">Name : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">{player?.name}</Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">Type : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">{player?.type}</Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">Points : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">{player?.points}</Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">Rank : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">{player?.rank}</Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">Age : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">{getAge(player?.dob)}</Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">DoB : </Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography variant="h5">
                {new Date(player?.dob as number).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Box>

          <Box paddingY={2} display="flex" width="100%">
            <Box display="flex" justifyContent="left" width={0.2}>
              <Typography variant="h5">About :</Typography>
            </Box>
            <Box display="flex" justifyContent="left" width={0.8}>
              <Typography textAlign="left" variant="h6">
                {player?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box textAlign="center" paddingTop={2}>
        <Typography variant="h5">You May Also Like</Typography>
      </Box>
      {/* similar player rendering */}
      <Box
        id="similarPlayer"
        paddingY={2}
        display="flex"
        style={{ flexWrap: "wrap" }}
        justifyContent="space-between"
      >
        {similarPlayer?.map((player, idx) => (
          <Box gap={4} paddingTop={4}>
            {" "}
            <Card sx={{ width: 345 }} elevation={40}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="180"
                image={player?.profilePic}
              />
              <CardContent>
                <Typography
                  textAlign="left"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Name :{" "}
                  <span>
                    <Typography display="inline" variant="body1">
                      {" "}
                      {player?.name}
                    </Typography>
                  </span>
                </Typography>
                <Typography textAlign="left" variant="h5">
                  Points :
                  <span>
                    <Typography display="inline" variant="body1">
                      {player.points}
                    </Typography>
                  </span>
                </Typography>
                <Typography
                  textAlign="left"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Rank :{" "}
                  <span>
                    <Typography display="inline" variant="body1">
                      {" "}
                      {player?.rank}
                    </Typography>
                  </span>
                </Typography>
                <Typography
                  textAlign="left"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Type :{" "}
                  <span>
                    <Typography display="inline" variant="body1">
                      {" "}
                      {player?.type}
                    </Typography>
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    onNavigate(player);
                  }}
                  size="small"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="left">
        <Button
          variant="contained"
          color="inherit"
          onClick={() => {
            onNavigateBack();
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};
export default PlayerDetails;
