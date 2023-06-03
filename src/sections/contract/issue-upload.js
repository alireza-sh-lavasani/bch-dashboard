import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

export const IssueUpload = () => {
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
          <Typography gutterBottom variant="h5">
            Please upload the issue file
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {file?.name}
          </Typography>
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
          Upload Issue File
        </Button>
      </CardActions>
    </Card>
  );
};
