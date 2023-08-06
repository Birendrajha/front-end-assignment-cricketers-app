import React, { useState, useEffect } from "react";
import { usePlayersHooks } from "../customHooks";
import { TMayBe, TPlayer } from "../services";
import {
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Menu,
  Fade,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";

export enum Filter {
  All = "All",
  Batsman = "batsman",
  Allrounder = "allRounder",
  Bowler = "bowler",
  WicketKeeper = "wicketKeeper",
}

// export interface Filter {
//   All: "All";
//   Batsman: "batsman";
//   Allrounder: "allRounder";
//   Bowler: "bowler";
//   WicketKeeper: "wicketKeeper";
// }

const filter = [
  Filter.All,
  Filter.Batsman,
  Filter.Bowler,
  Filter.WicketKeeper,
  Filter.Allrounder,
];

export const HeaderComp = ({
  onChangeSearchText,
  selectedFilter,
  setSelectedFilter,
  getFilteredPlayersList,
  resetFilter,
}: {
  onChangeSearchText: (searchText: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  getFilteredPlayersList: () => void;
  resetFilter: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>();
  const openMenu = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(e?.currentTarget);
    //setShowMenu(true);
  };
  const onClose = () => {
    setAnchorEl(undefined);
  };

  const onFilter = () => {
    getFilteredPlayersList();
    setAnchorEl(undefined);
  };
  const onresetFilter = () => {
    resetFilter();
    setAnchorEl(undefined);
  };
  return (
    <Box padding={2}>
      <Grid container>
        <Grid item sm={8} xs={12}>
          <Typography
            textAlign="left"
            style={{ color: "antiquewhite" }}
            variant="h2"
          >
            Icc Ranking
          </Typography>
        </Grid>
        <Grid
          item
          sm={3}
          xs={6}
          textAlign="right"
          display="flex"
          alignItems="center"
          justifyContent="right"
        >
          <TextField
            variant="outlined"
            label="Search"
            size="small"
            onChange={(e) => {
              onChangeSearchText(e?.target?.value);
            }}
          />
        </Grid>
        <Grid
          item
          sm={1}
          xs={6}
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="left"
        >
          <FilterListRoundedIcon
            onClick={(e) => {
              openMenu(e);
            }}
          />
        </Grid>
      </Grid>
      <Typography></Typography>
      <Menu
        // style={{ marginRight: "100x" }}
        keepMounted
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        id="player-filter-menu"
        TransitionComponent={Fade}
        onClose={onClose}
      >
        <Box display="flex">
          <Box padding={5}>
            <Typography>Filter By</Typography>
            <RadioGroup
              value={selectedFilter}
              onChange={(e, value: string) => {
                setSelectedFilter(e.target.value);
              }}
            >
              {filter.map((_key) => (
                <FormControlLabel
                  key={`${_key}-radio-option`}
                  value={_key}
                  control={<Radio />}
                  label={_key}
                />
              ))}
            </RadioGroup>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Box display="flex" justifyContent="left">
            <Button
              color="secondary"
              onClick={() => {
                onresetFilter();
              }}
            >
              Reset
            </Button>
          </Box>
          <Box display="flex" justifyContent="right">
            <Button
              onClick={() => {
                onFilter();
              }}
              color="primary"
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};
