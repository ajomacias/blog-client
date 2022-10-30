import { RouteObject } from "react-router-dom";
import EditProfile, { action as editAction, loader as editLoader } from "./EditProfile";
import Profile, { loader as profileLoader } from "./Profile";

const profileRoutes :RouteObject[] = [

  {
    path : ':id',
    element : <Profile />,
    loader : profileLoader
  },
  {
    path : 'edit',
    element : <EditProfile />,
    action : editAction,
    loader : editLoader
  },
  {
    path : ':id/edit',
    element : <EditProfile />,
    action : editAction,
    loader : editLoader
  }
];


export default profileRoutes;