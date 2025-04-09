import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  useMessages,
  useDeleteMessage,
  useMarkAsRead,
} from "../../hooks/useQueries";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: messages = [], isLoading } = useMessages();
  const deleteMessageMutation = useDeleteMessage();
  const markAsReadMutation = useMarkAsRead();

  const handleViewMessage = (message: Message) => {
    if (!message.read) {
      markAsReadMutation.mutateAsync(message._id);
    }
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteMessageMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  if (isLoading) {
    return <Typography>Loading messages...</Typography>;
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message: Message) => (
              <TableRow key={message._id}>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>
                  {new Date(message.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={message.read ? "Read" : "Unread"}
                    color={message.read ? "default" : "primary"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewMessage(message)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMessage(message._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Message Details</DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                From: {selectedMessage.name} ({selectedMessage.email})
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Date: {new Date(selectedMessage.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
                {selectedMessage.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Messages;
