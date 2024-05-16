import { useState } from "react";
import { capFirstLetter } from "../../../components/variables/capFirstLetter";
import ChipTech from "../../../components/layout/Chip";
import {
  projects,
  experience,
  education,
  certifications,
} from "../../../db/index";
import { fillColor } from "../../../components/variables/typeColors";
import {
  Checkbox,
  Stack,
  Select,
  Box,
  Chip,
  Option,
  Table,
  Link,
  Typography,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
} from "@mui/joy";
import { sortDate } from "../../../components/variables/sortDate";

import { FaInfoCircle } from "react-icons/fa";

export const Section2 = () => {
  const [typesFilter, setTypesFilter] = useState({
    projects: true,
    experience: true,
    education: true,
    certifications: true,
  });

  const [techsFilter, setTechsFilter] = useState([]);

  // Array with all the data
  const data = [...projects, ...experience, ...education, ...certifications];

  // Techs array
  const typesArray = () => {
    let allTypes = new Set();

    data.forEach((data) => {
      const type = data.type;
      allTypes.add(type);
    });

    return Array.from(allTypes);
  };

  const techsArray = () => {
    let allTechs = new Set();

    data.forEach((data) => {
      const techs = data.techs;

      techs?.forEach((tech) => {
        allTechs.add(tech);
      });
    });

    return Array.from(allTechs).sort((a, b) => a.localeCompare(b));
  };

  // Filter array
  const handleTypeChange = (type) => {
    setTypesFilter((obj) => ({
      ...obj,
      [type]: !obj[type],
    }));
  };

  const handleTechsChange = (event, value) => {
    setTechsFilter(value);
  };
  
  const dataFiltered = sortDate(data).filter((element) => {
    const types = typesFilter[element.type];

    const techs =
      techsFilter.length === 0 ||
      (element.techs &&
        techsFilter.every((selectedTech) =>
          element.techs.includes(selectedTech)
        ));

    return types && techs;
  });

  return (
    <Stack
      component="section"
      sx={{ alignItems: { xs: "center", lg: "baseline" } }}
    >
      {/* FILTERS */}
      <Stack
        component="section"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", lg: "left" },
          gap: { xs: 4, lg: 8 },
        }}
      >
        <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 4 }}>
          {/* TYPE FILTER */}
          {typesArray().map((type, index) => (
            <Checkbox
              key={index}
              variant="soft"
              defaultChecked
              onChange={() => handleTypeChange(type)}
              label={capFirstLetter(type)}
              sx={{
                color: "primary.white",
                "& .MuiCheckbox-checkbox": {
                  ...fillColor(type),
                  "&:hover": {
                    ...fillColor(type),
                  },
                },
              }}
            />
          ))}
        </Stack>

        {/* TECHS FILTER */}
        <Select
          multiple
          defaultValue={[]}
          placeholder="Choose a tech..."
          onChange={handleTechsChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", gap: 1 }}>
              {selected.map((selectedOption, index) => (
                <Chip
                  key={index}
                  variant="soft"
                  sx={{
                    color: "primary.white",
                    bgcolor: "primary.lighterDarkBlue",
                  }}
                >
                  {selectedOption.label}
                </Chip>
              ))}
            </Box>
          )}
          sx={{
            minWidth: "240px",
            bgcolor: "transparent",
            borderColor: "primary.white3",
            "&:hover": { bgcolor: "transparent", opacity: "0.8" },
          }}
        >
          {techsArray().map((tech, index) => (
            <Option key={index} value={tech}>
              {tech}
            </Option>
          ))}
        </Select>
      </Stack>

      {/* TABLE */}
      <Table
        sx={{
          width: { xs: "90%", lg: "100%" },
          mt: 8,
          fontSize: "14px",
          th: {
            bgcolor: "transparent",
            color: "primary.white",
          },
          td: {
            py: 2,
            verticalAlign: "top",
          },
          "& th:nth-of-type(1)": {
            width: { md: "10%" },
          },
          "& th:nth-of-type(2)": {
            width: { md: "20%" },
          },
          "& th:nth-of-type(3)": {
            width: { md: "30%" },
          },
          "& th:nth-of-type(4)": {
            width: { xs: "20%", md: "35%" },
            textAlign: { xs: "center", sm: "left" },
          },
          "& td:nth-of-type(1)": {
            color: "primary.white3",
            fontSize: { xs: "12px", sm: "14px" },
          },
          "& td:nth-of-type(2)": {
            color: "primary.white",
            fontSize: { xs: "12px", sm: "14px" },
          },
          "& td:nth-of-type(3)": {
            color: "primary.white3",
            fontSize: { xs: "12px", sm: "14px" },
          },
          "& td:nth-of-type(4)": {
            color: "primary.white",
            fontSize: { xs: "12px", sm: "14px" },
            textAlign: { xs: "center", sm: "left" },
          },
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Place</th>
            <th>Techs</th>
          </tr>
        </thead>

        <tbody>
          {dataFiltered.map((element, index) => {
            return (
              <tr key={index}>
                {/* DATE */}
                <td>
                  <Typography level="body-sm">
                    {element.yearStart} {element.monthStart}
                  </Typography>
                  <Typography level="body-sm">
                    {(element.yearEnd !== null ||
                      element.monthEnd !== null) && (
                      <>
                        {" "}
                        — {element.yearEnd} {element.monthEnd}
                      </>
                    )}
                  </Typography>
                </td>

                {/* NAME */}
                <td>
                  <Typography>{element.name}</Typography>
                </td>

                {/* PLACE */}
                <td>
                  <Typography>{element.place}</Typography>
                </td>

                {/* TECHS */}
                <td>
                  <Box sx={{ display: { xs: "none", sm: "inline-block" } }}>
                    {element.techs?.map((tech, index) => {
                      return (
                        <ChipTech tech={tech} type={element.type} key={index} />
                      );
                    })}
                  </Box>

                  <Box sx={{ display: { xs: "inline-block", sm: "none" } }}>
                    <Dropdown>
                      <MenuButton
                        variant="plain"
                        sx={{
                          padding: 0,
                          margin: 0,
                          cursor: "pointer",
                          outline: "none",
                          boxShadow: "none",
                          "&:hover": {
                            background: "none",
                          },
                          "&:active": {
                            background: "none",
                          },
                          "&:focus": {
                            outline: "none",
                          },
                        }}
                      >
                        <FaInfoCircle color="white" size={20} />
                      </MenuButton>
                      <Menu sx={{ bgcolor: "primary.darkBlue" }}>
                        {element.techs?.map((tech, index) => {
                          return (
                            <MenuItem key={index}>
                              <ChipTech tech={tech} type={element.type} />
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </Dropdown>
                  </Box>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Stack>
  );
};
