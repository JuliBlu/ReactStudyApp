import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Checkbox,
  CheckboxGroup,
  Stack,
  TabPanel,
} from "@chakra-ui/react";
import TopBar from "./TopBar";
import DataStorageHandler from "./DataStorageHandler"; // Import the handler
import POIInfo from "./POIInfo";

const fetchPOIData = async () => {
  const response = await fetch("/poi_data.json");
  const data = await response.json();
  return data;
};

function POIRatingComponent(props) {
  const [markers, setMarkers] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(props.category);
  const [tabIndex, setTabIndex] = useState(0);
  const [leftPOI, setLeftPOI] = useState(null);
  const [rightPOI, setRightPOI] = useState(null);

  const [questionAnswers, setQuestionAnswers] = useState({
    engagementAndAppeal: "",
    personalization: "",
    likelihoodOfAction: "",
    titlePreference: "",
    descriptionPreference: "",
    comments: "",
  });

  const [isRigthAdapted, setIsRightAdapted] = useState(null);
  const [leftPOICheckboxValues, setLeftPOICheckboxValues] = useState({});
  const [rightPOICheckboxValues, setRightPOICheckboxValues] = useState({});
  const [leftSubmitted, setLeftSubmitted] = useState(false);
  const [rightSubmitted, setRightSubmitted] = useState(false);
  const [dataStructure, setDataStructure] = useState({
    Part1: {
      originalPOI: { name: "", description: "", checkboxValues: {} },
      adaptedPOI: { name: "", description: "", checkboxValues: {} },
      Q1: "", // Engagement and Appeal
      Q2: "", // Personalization
      Q3: "", // Likelihood of Action
      Title: "", // Overall Comparison Title
      Description: "", // Overall Comparison Description
      Comments: "", // Optional Comments
    },
    Part2: {
      originalPOI: { name: "", description: "", checkboxValues: {} },
      adaptedPOI: { name: "", description: "", checkboxValues: {} },
      Q1: "",
      Q2: "",
      Q3: "",
      Title: "",
      Description: "",
      Comments: "",
    },
    Part3: {
      originalPOI: { name: "", description: "", checkboxValues: {} },
      adaptedPOI: { name: "", description: "", checkboxValues: {} },
      Q1: "",
      Q2: "",
      Q3: "",
      Title: "",
      Description: "",
      Comments: "",
    },
    Part4: {
      originalPOI: { name: "", description: "", checkboxValues: {} },
      adaptedPOI: { name: "", description: "", checkboxValues: {} },
      Q1: "",
      Q2: "",
      Q3: "",
      Title: "",
      Description: "",
      Comments: "",
    },
  });

  useEffect(() => {
    setTabIndex(0);
    updatePOIs(0);
  }, [currentCategory]);

  const updatePOIs = async (index) => {
    const data = await fetchPOIData();
    const category = data.categories.find(
      (cat) => cat.name === currentCategory.name
    );
    if (category) {
      setMarkers(category.pois);

      const isRightSide = Math.random() >= 0.5;
      setIsRightAdapted(isRightSide);
      const updatedMarkers = [...category.pois];

      const adaptedPOIUsed = getAdaptedPOI(updatedMarkers[index].title);

      let leftPOI, rightPOI;

      if (isRightSide) {
        rightPOI = adaptedPOIUsed;
        leftPOI = {
          title: updatedMarkers[index].title,
          description: updatedMarkers[index].description,
          imagesrc: updatedMarkers[index].imagesrc,
        };
        updatedMarkers[index] = adaptedPOIUsed;
      } else {
        leftPOI = adaptedPOIUsed;
        rightPOI = {
          title: updatedMarkers[index].title,
          description: updatedMarkers[index].description,
          imagesrc: updatedMarkers[index].imagesrc,
        };
        updatedMarkers[index] = adaptedPOIUsed;
      }

      setLeftPOI(leftPOI);
      setRightPOI(rightPOI);
      setMarkers(updatedMarkers);
    } else {
      setMarkers([]);
      setTabIndex(null);
    }

    setLeftSubmitted(false);
    setRightSubmitted(false);
  };

  const getAdaptedPOI = (originalTitle) => {
    const matchedPOI = props.poiDataList.find(
      (poi) => poi.key === originalTitle
    );
    if (matchedPOI) {
      const obj = {
        title: matchedPOI.value[0],
        description: matchedPOI.value[1],
        imagesrc: matchedPOI.value[2],
      };
      //console.log("AdaptedPOI:" + obj.title + "|" + obj.description + "|" + obj.imagesrc)
      return obj;
    }

    return { title: "Not Found", description: "No matching POI found." };
  };

  const handleCheckboxChange = (question, value) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleLeftSubmit = () => {
    setLeftSubmitted(true);
    if (isRigthAdapted) {
      saveDataPOI("originalPOI", leftPOICheckboxValues);
    } else {
      saveDataPOI("adaptedPOI", leftPOICheckboxValues);
    }
  };

  const handleRightSubmit = () => {
    setRightSubmitted(true);
    if (isRigthAdapted) {
      saveDataPOI("adaptedPOI", rightPOICheckboxValues);
    } else {
      saveDataPOI("originalPOI", rightPOICheckboxValues);
    }
  };

  const saveDataPOI = (poiType, checkboxValues) => {
    const updatedData = { ...dataStructure };
    const part = `Part${tabIndex + 1}`;

    if (poiType === "originalPOI") {
      updatedData[part][poiType].checkboxValues = checkboxValues;
      updatedData[part][poiType].name = isRigthAdapted
        ? leftPOI.title
        : rightPOI.title;
      updatedData[part][poiType].description = isRigthAdapted
        ? leftPOI.description
        : rightPOI.description;
    } else if (poiType === "adaptedPOI") {
      updatedData[part][poiType].checkboxValues = checkboxValues;
      updatedData[part][poiType].name = isRigthAdapted
        ? rightPOI.title
        : leftPOI.title;
      updatedData[part][poiType].description = isRigthAdapted
        ? rightPOI.description
        : leftPOI.description;
    }

    setDataStructure(updatedData);
  };

  const saveDataQuestions = () => {
    const updatedData = { ...dataStructure };
    const part = `Part${tabIndex + 1}`;

    // Determine the mapping for the selected POI
    // Determine the mapping for the selected POI
    const engagementAndAppeal =
      questionAnswers.engagementAndAppeal === "A"
        ? isRigthAdapted
          ? "originalPOI"
          : "adaptedPOI"
        : questionAnswers.engagementAndAppeal === "B"
        ? isRigthAdapted
          ? "adaptedPOI"
          : "originalPOI"
        : "No Preference";

    const personalization =
      questionAnswers.personalization === "A"
        ? isRigthAdapted
          ? "originalPOI"
          : "adaptedPOI"
        : questionAnswers.personalization === "B"
        ? isRigthAdapted
          ? "adaptedPOI"
          : "originalPOI"
        : "No Preference";

    const likelihoodOfAction =
      questionAnswers.likelihoodOfAction === "A"
        ? isRigthAdapted
          ? "originalPOI"
          : "adaptedPOI"
        : questionAnswers.likelihoodOfAction === "B"
        ? isRigthAdapted
          ? "adaptedPOI"
          : "originalPOI"
        : "No Preference";

    const titlePreference =
      questionAnswers.titlePreference === "A"
        ? isRigthAdapted
          ? "originalPOI"
          : "adaptedPOI"
        : questionAnswers.titlePreference === "B"
        ? isRigthAdapted
          ? "adaptedPOI"
          : "originalPOI"
        : "No Preference";

    const descriptionPreference =
      questionAnswers.descriptionPreference === "A"
        ? isRigthAdapted
          ? "originalPOI"
          : "adaptedPOI"
        : questionAnswers.descriptionPreference === "B"
        ? isRigthAdapted
          ? "adaptedPOI"
          : "originalPOI"
        : "No Preference";

    // Update the data structure
    updatedData[part]["Q1"] = engagementAndAppeal;
    updatedData[part]["Q2"] = personalization;
    updatedData[part]["Q3"] = likelihoodOfAction;
    updatedData[part]["Title"] = titlePreference;
    updatedData[part]["Description"] = descriptionPreference;
    updatedData[part]["Comments"] = questionAnswers.comments;

    setDataStructure(updatedData);
  };

  const handleProceed = () => {
    // Save the general questions before proceeding
    saveDataQuestions();

    // Extract the current part of the data structure
    const part = `Part${tabIndex + 1}`;
    const categoryName = currentCategory.name.toLowerCase().replace(/\s+/g, "");

    // Retrieve the POI data from the data structure
    const poiData = {
      originalPOI: dataStructure[part].originalPOI,
      adaptedPOI: dataStructure[part].adaptedPOI,
    };

    // Retrieve the answers from the data structure
    const answers = {
      engagementAndAppeal: dataStructure[part].Q1,
      personalization: dataStructure[part].Q2,
      likelihoodOfAction: dataStructure[part].Q3,
      titlePreference: dataStructure[part].Title,
      descriptionPreference: dataStructure[part].Description,
      comments: dataStructure[part].Comments,
    };

    // Log the answers for debugging
    console.log("Answers:", answers);

    // Call DataStorageHandler to save both ratings in one JSON object
    DataStorageHandler.updatePOIRatings(
      categoryName,
      poiData.originalPOI,
      poiData.adaptedPOI,
      answers
    );

    // Reset the checkbox values for both POIs
    setLeftPOICheckboxValues({});
    setRightPOICheckboxValues({});

    // Proceed to the next POI or view
    if (tabIndex < markers.length - 1) {
      setTabIndex(tabIndex + 1);
      window.scrollTo(0, 0);
      setQuestionAnswers({
        engagementAndAppeal: "",
        personalization: "",
        likelihoodOfAction: "",
        titlePreference: "",
        descriptionPreference: "",
        comments: "",
      });
      updatePOIs(tabIndex + 1);
    } else {
      if (currentCategory.name === "Accommodation") {
        props.switchView("view4");
      } else if (currentCategory.name === "Natural Attractions") {
        props.switchView("view6");
      } else if (currentCategory.name === "Entertainment") {
        props.switchView("view8");
      } else if (currentCategory.name === "Cultural and Historical Sites") {
        props.switchView("view10");
      } else if (currentCategory.name === "Commercial and Shopping") {
        props.switchView("view12");
      }
    }
  };

  return (
    <ChakraProvider>
      <TopBar category={currentCategory} toggleDrawer={props.toggleDrawer} />

      <Box textAlign="center" mb={6} mt={6}>
        <Text fontSize="4xl" fontWeight="bold">
          Evaluating POI ({tabIndex + 1}/{markers.length}) - Category:{" "}
          {currentCategory.name}
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        mt={4}
        mb={10}
      >
        <Tabs index={tabIndex} variant="enclosed">
          <TabList>
            {markers.map((poi, index) => (
              <Tab key={poi.id} style={{ pointerEvents: "none" }}>
                POI {index + 1}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {markers.map((poi, index) => (
              <TabPanel key={poi.id}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-start"
                  gap={10} // Add this line to set the gap between the POIInfo components
                >
                  <POIInfo
                    marker={leftPOI}
                    values={leftPOICheckboxValues}
                    handleValueChange={(key, value) => {
                      setLeftPOICheckboxValues((prev) => ({
                        ...prev,
                        [key]: value,
                      }));
                    }}
                    onSubmit={handleLeftSubmit}
                    isSubmitted={leftSubmitted}
                  />

                  <POIInfo
                    marker={rightPOI}
                    values={rightPOICheckboxValues}
                    handleValueChange={(key, value) => {
                      setRightPOICheckboxValues((prev) => ({
                        ...prev,
                        [key]: value,
                      }));
                    }}
                    onSubmit={handleRightSubmit}
                    isSubmitted={rightSubmitted}
                  />
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>

      <Box
        width="90%"
        p={4}
        bg="gray.100"
        color="black"
        borderRadius="md"
        boxShadow="md"
        mt={4}
        mx="auto"
      >
        <FormControl mb={4}>
          <Stack spacing={2} direction="column">
            <FormLabel>
              Which description did you find more engaging and appealing
              (captured your attention more)?
            </FormLabel>
            <CheckboxGroup>
              <Stack spacing={5} direction="row">
                <Checkbox
                  isChecked={questionAnswers.engagementAndAppeal === "A"}
                  onChange={() =>
                    handleCheckboxChange("engagementAndAppeal", "A")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Left POI (A)
                </Checkbox>
                <Checkbox
                  isChecked={questionAnswers.engagementAndAppeal === "B"}
                  onChange={() =>
                    handleCheckboxChange("engagementAndAppeal", "B")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Right POI (B)
                </Checkbox>
                <Checkbox
                  isChecked={
                    questionAnswers.engagementAndAppeal === "No Preference"
                  }
                  onChange={() =>
                    handleCheckboxChange("engagementAndAppeal", "No Preference")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  No Preference
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </FormControl>

        <FormControl mb={4}>
          <Stack spacing={2} direction="column">
            <FormLabel>
              Which description did you find more relevant to your interests?
            </FormLabel>
            <CheckboxGroup>
              <Stack spacing={5} direction="row">
                <Checkbox
                  isChecked={questionAnswers.personalization === "A"}
                  onChange={() => handleCheckboxChange("personalization", "A")}
                  sx={{ borderColor: "gray.600" }}
                >
                  Left POI (A)
                </Checkbox>
                <Checkbox
                  isChecked={questionAnswers.personalization === "B"}
                  onChange={() => handleCheckboxChange("personalization", "B")}
                  sx={{ borderColor: "gray.600" }}
                >
                  Right POI (B)
                </Checkbox>
                <Checkbox
                  isChecked={
                    questionAnswers.personalization === "No Preference"
                  }
                  onChange={() =>
                    handleCheckboxChange("personalization", "No Preference")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  No Preference
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </FormControl>

        <FormControl mb={4}>
          <Stack spacing={2} direction="column">
            <FormLabel>
              Which description makes you more eager to visit the POI?
            </FormLabel>
            <CheckboxGroup>
              <Stack spacing={5} direction="row">
                <Checkbox
                  isChecked={questionAnswers.likelihoodOfAction === "A"}
                  onChange={() =>
                    handleCheckboxChange("likelihoodOfAction", "A")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Left POI (A)
                </Checkbox>
                <Checkbox
                  isChecked={questionAnswers.likelihoodOfAction === "B"}
                  onChange={() =>
                    handleCheckboxChange("likelihoodOfAction", "B")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Right POI (B)
                </Checkbox>
                <Checkbox
                  isChecked={
                    questionAnswers.likelihoodOfAction === "No Preference"
                  }
                  onChange={() =>
                    handleCheckboxChange("likelihoodOfAction", "No Preference")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  No Preference
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </FormControl>

        <FormControl mb={4}>
          <Stack spacing={2} direction="column">
            <FormLabel>Which Title do you prefer:</FormLabel>
            <CheckboxGroup>
              <Stack spacing={5} direction="row">
                <Checkbox
                  isChecked={questionAnswers.titlePreference === "A"}
                  onChange={() => handleCheckboxChange("titlePreference", "A")}
                  sx={{ borderColor: "gray.600" }}
                >
                  Left POI (A)
                </Checkbox>
                <Checkbox
                  isChecked={questionAnswers.titlePreference === "B"}
                  onChange={() => handleCheckboxChange("titlePreference", "B")}
                  sx={{ borderColor: "gray.600" }}
                >
                  Right POI (B)
                </Checkbox>
                <Checkbox
                  isChecked={
                    questionAnswers.titlePreference === "No Preference"
                  }
                  onChange={() =>
                    handleCheckboxChange("titlePreference", "No Preference")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  No Preference
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </FormControl>

        <FormControl mb={4}>
          <Stack spacing={2} direction="column">
            <FormLabel>Which Description do you prefer:</FormLabel>
            <CheckboxGroup>
              <Stack spacing={5} direction="row">
                <Checkbox
                  isChecked={questionAnswers.descriptionPreference === "A"}
                  onChange={() =>
                    handleCheckboxChange("descriptionPreference", "A")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Left POI (A)
                </Checkbox>
                <Checkbox
                  isChecked={questionAnswers.descriptionPreference === "B"}
                  onChange={() =>
                    handleCheckboxChange("descriptionPreference", "B")
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  Right POI (B)
                </Checkbox>
                <Checkbox
                  isChecked={
                    questionAnswers.descriptionPreference === "No Preference"
                  }
                  onChange={() =>
                    handleCheckboxChange(
                      "descriptionPreference",
                      "No Preference"
                    )
                  }
                  sx={{ borderColor: "gray.600" }}
                >
                  No Preference
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </Stack>
        </FormControl>
      </Box>

      <FormControl margin={10} width="90%" mx="auto">
        <Stack spacing={2} direction="column">
          <FormLabel>Comments (Optional)</FormLabel>
          <Textarea
            placeholder="Please provide any additional comments or thoughts on either of the above sections (explanation for your ratings)"
            name="comments"
            value={questionAnswers.comments}
            onChange={(e) => handleCheckboxChange("comments", e.target.value)}
          />
        </Stack>
        <Button
        width="100%"
        colorScheme="blue"
        marginTop={10}
        onClick={handleProceed}
        isDisabled={!leftSubmitted || !rightSubmitted}
        mx="auto"
      >
        {tabIndex < markers.length - 1 ? "Next POI" : "Proceed to Next View"}
      </Button>
      </FormControl>

      
    </ChakraProvider>
  );
}

export default POIRatingComponent;
