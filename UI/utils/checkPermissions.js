import { UnauthorizedError } from "../errors";

const chechPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  UnauthorizedError("Not authorized to access this route");
};

export default chechPermissions;
