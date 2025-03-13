import { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  py: 5,
};

export const titleStyle: SxProps<Theme> = {
  textAlign: "center",
  marginBottom: 4,
};

export const gridContainerStyle: SxProps<Theme> = {
  justifyContent: "center", // Center the grid items
};

export const cardStyle: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center content horizontally
  textAlign: "center",
  padding: 2,
};

export const mediaStyle: SxProps<Theme> = {
  width: "auto",
  height: 200,
  objectFit: "contain",
  marginBottom: 2,
};

export const refreshBtnWrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: 20,
};
