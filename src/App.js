import React, { useState } from "react";
import "./App.css";
import LeafletMap from "./LeafletMap";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
  Stepper,
  Step,
  StepContent,
  StepButton,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SearchIcon from "@mui/icons-material/Search";
import { getCoordinates } from "./getCoordinatesFree";

const App = () => {
  const [onSearchInput, setOnSearchInput] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(["Start location"]);
  const [route, setRoute] = useState();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleGetCoorinates = async () => {
    let coordinates = await getCoordinates(onSearchInput);
    if (coordinates !== undefined) {
      let pushLocation = { onSearchInput, coordinates };
      locationList[activeStep] = pushLocation;
      setOnSearchInput("");
    }
  };

  const handleSave = () => {
    setRoute(locationList);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          bgcolor: "#FCFCFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: 1000,
            height: 700,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction='row' spacing={6}>
            <Box sx={{ width: 340, mt: 5 }}>
              <Typography variant='h6' sx={{ mb: 1, pl: 1 }}>
                Create Route
              </Typography>
              <Stack direction='row' spacing={2} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size='small'
                  placeholder='Search location'
                  variant='outlined'
                  name='adress_line'
                  value={onSearchInput}
                  onChange={(e) => {
                    setOnSearchInput(e.target.value);
                  }}
                />
                <IconButton color='primary' onClick={handleGetCoorinates}>
                  <SearchIcon />
                </IconButton>
              </Stack>
              <Paper sx={{ bgcolor: "#FAFAFA", p: 2, pl: 5 }}>
                <Stepper
                  nonLinear
                  activeStep={activeStep}
                  orientation='vertical'
                >
                  {steps.map((label, index) => (
                    <Step key={index}>
                      <StepButton color='inherit' onClick={handleStep(index)}>
                        {index + 1 === steps.length && steps.length > 1
                          ? "End location"
                          : label}
                      </StepButton>
                      <StepContent>
                        <Stack sx={{ mt: 1, mb: 1 }}>
                          <Typography variant='caption' component='div'>
                            Name: {locationList[index]?.onSearchInput}
                          </Typography>
                          <Typography variant='caption' component='div'>
                            Latitude: {locationList[index]?.coordinates.lat}
                          </Typography>
                          <Typography variant='caption' component='div'>
                            Longitude: {locationList[index]?.coordinates.lng}
                          </Typography>
                        </Stack>
                        <Stack direction='row' spacing={1}>
                          <Button
                            disabled={index !== 0 && !route ? false : true}
                            onClick={() => {
                              let stepArr = steps.filter(
                                (item, index) => index !== activeStep
                              );
                              setSteps(stepArr);
                              let locationlistDel = locationList.filter(
                                (item, index) => index !== activeStep
                              );
                              setLocationList(locationlistDel);
                              setActiveStep(index - 1);
                            }}
                          >
                            Delete
                          </Button>
                          {index + 1 === steps.length && (
                            <Button
                              disabled={
                                locationList[index] && index < 4 && !route
                                  ? false
                                  : true
                              }
                              onClick={() => {
                                setSteps([...steps, `Waypoint`]);
                                setActiveStep(index + 1);
                              }}
                            >
                              Add more
                            </Button>
                          )}
                        </Stack>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                <Button
                  sx={{ mt: 3 }}
                  variant='contained'
                  disabled={
                    locationList[1] &&
                    !route &&
                    steps.length === locationList.length
                      ? false
                      : true
                  }
                  onClick={handleSave}
                >
                  Create route
                </Button>
              </Paper>
            </Box>
            <Box sx={{ alignSelf: "center" }}>
              <LeafletMap
                height={600}
                width={500}
                position={locationList[activeStep]?.coordinates}
                route={route}
              />
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default App;
