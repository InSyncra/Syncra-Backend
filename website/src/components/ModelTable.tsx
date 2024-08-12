import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const getTypeLink = (type: string) => {
  const typeMappings: { [key: string]: string } = {
    "Project[]": "/models/project",
    Project: "/models/project",
    "Review[]": "/models/review",
    "ProjectCollaboration[]": "/models/project-collaboration",
    "Comment[]": "/models/comment",
    "ChatMessage[]": "/models/chat-message",
    "UserBadge[]": "/models/user-badge",
    UserStatus: "/enums/user-status",
    "User[]": "/models/user",
    User: "/models/user",
    ProjectStatus: "/enums/project-status",
    "ProjectUpdate[]": "/models/project-update",
  };

  return typeMappings[type] || "";
};

const ModelTable = ({ model }: { model: any }) => {
  return (
    <Table className="w-3/4">
      <TableHeader>
        <TableRow>
          <TableHead>Attribute</TableHead>
          <TableHead>Returns Data Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Unique?</TableHead>
          <TableHead>Required?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(model).map((key) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>
              {getTypeLink(model[key].type) ? (
                <Link
                  href={getTypeLink(model[key].type)}
                  className="underline text-slate-500"
                >
                  {model[key].type}
                </Link>
              ) : (
                model[key].type
              )}
            </TableCell>
            <TableCell>{model[key].description}</TableCell>
            <TableCell>{model[key].unique ? "Yes" : "No"}</TableCell>
            <TableCell>{model[key].required ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ModelTable;
