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
import ImportExportIcon from "@mui/icons-material/ImportExport";
export enum Filter {
  All = "All",
  Batsman = "Batsman",
  Allrounder = "AllRounder",
  Bowler = "Bowler",
  WicketKeeper = "WicketKeeper",
}

export enum SortBy {
  Rank = "Rank",
  Name = "Name",
  Age = "Age",
}

const sortByArr = [SortBy.Rank, SortBy.Name, SortBy.Age];

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
  resetFilter,
  selectedSortBy,
  setSelectedSortBy,
  resetSortBy,
}: {
  onChangeSearchText: (searchText: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;

  resetFilter: () => void;
  selectedSortBy: string;
  setSelectedSortBy: (sortBy: string) => void;
  resetSortBy: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>();
  const [anchorElForSort, setAnchorElForSort] =
    useState<null | SVGSVGElement>();

  const [_sortBy, _setSortBy] = useState<string>(selectedSortBy);
  const [_filterBy, _setFilterBy] = useState<string>(selectedFilter);
  const openMenuForFilter = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    setAnchorEl(e?.currentTarget);
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
    setSelectedFilter(_filterBy);
    setAnchorEl(undefined);
  };
  const onresetFilter = () => {
    resetFilter();
    setAnchorEl(undefined);
  };

  const onSort = () => {
    setSelectedSortBy(_sortBy);
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
          style={{ cursor: "pointer" }}
        >
          <ImportExportIcon
            onClick={(e) => {
              openMenuForSort(e);
            }}
          />
          <Box>
            <Typography color="#fff" variant="body2">
              {Boolean(selectedSortBy) ? `Sort By ${selectedSortBy}` : ""}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sm={3}
          xs={6}
          textAlign="right"
          display="flex"
          alignItems="center"
          justifyContent="center"
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
          style={{ cursor: "pointer" }}
        >
          <FilterListRoundedIcon
            onClick={(e) => {
              openMenuForFilter(e);
            }}
          />
          <Box paddingX={2}>
            <Typography color="#fff" variant="body2">
              Filter
            </Typography>
          </Box>
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
              value={_filterBy}
              onChange={(e, value: string) => {
                _setFilterBy(e.target.value);
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
        id="player-sort-menu"
        TransitionComponent={Fade}
        onClose={onClose}
      >
        <Box display="flex">
          <Box padding={5}>
            <Typography>Sort By</Typography>
            <RadioGroup
              value={_sortBy}
              onChange={(e, value: string) => {
                _setSortBy(e.target.value);
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
                onresetSort();
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
              Sort
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};
