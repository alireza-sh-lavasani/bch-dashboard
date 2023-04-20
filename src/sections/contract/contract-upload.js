import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

export const ContractUpload = () => {
  const fileRef = useRef();

  const [file, setFile] = useState();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          /> */}
          <Typography gutterBottom variant="h5">
            Please upload the contract file
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {file?.name}
          </Typography>
          {/* <Typography color="text.secondary" variant="body2">
            {user.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input
          ref={fileRef}
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            setFile(file);
            console.log("Selected file:", file);
            // Process the file as needed, e.g., upload to a server
          }}
        />
        <Button
          fullWidth
          variant="text"
          onClick={() => {
            if (fileRef.current) {
              fileRef.current.click();
            }
          }}
        >
          Upload Contract File
        </Button>
      </CardActions>
    </Card>
  );
};
