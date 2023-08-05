import React, { useState, useEffect } from "react";
import { usePlayersHooks } from "../customHooks";
import { TMayBe, TPlayer } from "../services";
import { Typography, Box, Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

export const PlayerListComp = ({ playerList }: { playerList: TPlayer[] }) => {
  return (
    <Box>
      {playerList?.length > 0
        ? playerList?.map((player) => (
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 180 }}
                image={player?.profilePic}
                title="green iguana"
              />
              {/* <Avatar alt="Remy Sharp" src={player?.profilePic} /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {player?.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          ))
        : null}
    </Box>
  );
};
