import PropTypes from "prop-types";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { uploadFile } from "../../api";

const FileUpload = ({ map, datasets, setDatasets }) => {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false); 
  const [isFileUploaded, setIsFileUploaded] = useState(false); 

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/json",
    multiple: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && email) {
      setIsUploading(true);  // Start uploading process
      try {
        const response = await uploadFile(file, email);
        console.log("Upload response:", response);

        Swal.fire({
          title: "Success",
          text: response.message || "File uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        if (response.file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = JSON.parse(event.target.result);
            const id = `dataset-${datasets.length}`;
            map.addSource(id, {
              type: "geojson",
              data: data,
            });
            map.addLayer({
              id: id,
              type: "fill",
              source: id,
              layout: {},
              paint: {
                "fill-color": "#888888",
                "fill-opacity": 0.4,
              },
            });
            setDatasets([...datasets, { id, name: file.name, visible: true }]);
          };
          reader.readAsText(file);
        }

        setIsFileUploaded(true);  // Mark the file as uploaded successfully
      } catch (error) {
        console.error("Error uploading file:", error);

        Swal.fire({
          title: "Error",
          text: "Error uploading file. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsUploading(false);  
      }
    } else {
      Swal.fire({
        title: "Warning",
        text: "Please provide a valid file and email address.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const toggleDatasetVisibility = (id) => {
    const visibility = map.getLayoutProperty(id, "visibility");
    map.setLayoutProperty(id, "visibility", visibility === "visible" ? "none" : "visible");
    setDatasets(datasets.map((dataset) => (dataset.id === id ? { ...dataset, visible: !dataset.visible } : dataset)));
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Upload File
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            required
          />
        </Box>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 4,
            padding: 4,
            textAlign: "center",
            backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
            cursor: "pointer",
            marginBottom: 2,
            boxShadow: 2,
          }}
        >
          <input {...getInputProps()} />
          {file ? (
            <Typography variant="body1">Selected File: {file.name}</Typography>
          ) : (
            <Typography variant="body2">
              {isDragActive ? "Drop the file here..." : "Drag and drop a file here, or click to select a file"}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isUploading || isFileUploaded}  
        >
          {isUploading ? "Uploading..." : isFileUploaded ? "Uploaded" : "Upload"} 
        </Button>
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Uploaded Datasets
        </Typography>
        {datasets.map((dataset) => (
          <Box key={dataset.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dataset.visible}
                  onChange={() => toggleDatasetVisibility(dataset.id)}
                  color="primary"
                />
              }
              label={dataset.name}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

FileUpload.propTypes = {
  map: PropTypes.object.isRequired,
  datasets: PropTypes.array.isRequired,
  setDatasets: PropTypes.func.isRequired,
};

export default FileUpload;
