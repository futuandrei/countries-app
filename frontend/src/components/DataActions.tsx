import { IconButton, Tooltip } from "@mui/material";
import { TestData } from "../types/test";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DataActionsProps {
  row: TestData;
  onEdit: (row: TestData) => void;
  onDelete: (row: TestData) => void;
}

export const DataActions = ({ row, onEdit, onDelete }: DataActionsProps) => {
  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={() => onEdit(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => onDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
