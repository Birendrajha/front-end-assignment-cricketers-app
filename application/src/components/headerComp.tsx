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
import SortIcon from "@mui/icons-material/Sort";
export enum Filter {
  All = "All",
  Batsman = "Batsman",
  Allrounder = "AllRounder",
  Bowler = "Bowler",
  WicketKeeper = "WicketKeeper",
}

export enum SortBy {
  Name = "Name",
  Rank = "Rank",
  Age = "Age",
}

const sortByArr = [SortBy.Name, SortBy.Age, SortBy.Rank];

const filterArr = [
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
  selectedSortBy,
  setSelectedSortBy,
  resetSortBy,
  getSortedList,
}: {
  onChangeSearchText: (searchText: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  getFilteredPlayersList: () => void;
  resetFilter: () => void;
  selectedSortBy: string;
  setSelectedSortBy: (sortBy: string) => void;
  resetSortBy: () => void;
  getSortedList: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>();
  const [anchorElForSort, setAnchorElForSort] =
    useState<null | SVGSVGElement>();
  const openMenuForFilter = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setAnchorEl(e?.currentTarget);
    //setShowMenu(true);
  };
  const openMenuForSort = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorElForSort(e?.currentTarget);
  };
  const onClose = () => {
    if (Boolean(anchorEl)) {
      setAnchorEl(undefined);
    }

    if (Boolean(anchorElForSort)) {
      setAnchorElForSort(undefined);
    }
  };

  const onFilter = () => {
    getFilteredPlayersList();
    setAnchorEl(undefined);
  };
  const onresetFilter = () => {
    resetFilter();
    setAnchorEl(undefined);
  };

  const onSort = () => {
    getSortedList();
    setAnchorElForSort(undefined);
  };
  const onresetSort = () => {
    resetSortBy();
    setAnchorElForSort(undefined);
  };

  return (
    <Box padding={2}>
      <Grid container>
        <Grid item sm={6} xs={12}>
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
          sm={1}
          xs={6}
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="right"
        >
          <SortIcon
            onClick={(e) => {
              openMenuForSort(e);
            }}
          />
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
            inputProps={{ style: { color: "#fff" } }}
            color="primary"
            variant="outlined"
            // variant="filled"
            label="Search"
            //className={classes.root}
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
              openMenuForFilter(e);
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
              {filterArr.map((_key) => (
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

      <Menu
        // style={{ marginRight: "100x" }}
        keepMounted
        open={Boolean(anchorElForSort)}
        anchorEl={anchorElForSort}
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
              {sortByArr.map((_key) => (
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
                onSort();
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
