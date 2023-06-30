import React from "react";
import { useCollection } from "./useCollection";
import { useWatch } from "./useWatch";
import atlasConfig from "../atlasConfig.json";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getImprovementIndex,
} from "../utils";

const { dataSourceName } = atlasConfig;

export function useUsers() {
  // Set up a list of users in state
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the improvement item collection
  const usersCollection = useCollection({
    cluster: dataSourceName,
    db: "requestly",
    collection: "users",
  });

  // Fetch all improvements on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchUsers = usersCollection.find({})
    if (shouldUpdate) {
      fetchUsers.then((users) => {
        setUsers(users);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [usersCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(usersCollection, {
    onInsert: (change) => {
        setUsers((oldUsers) => {
        if (loading) {
          return oldUsers;
        }
        const idx =
        getImprovementIndex(oldUsers, change.fullDocument) ?? oldUsers.length;
        if (idx === oldUsers.length) {
          return addValueAtIndex(oldUsers, idx, change.fullDocument);
        } else {
          return oldUsers;
        }
      });
    },
    onUpdate: (change) => {
        setUsers((oldUsers) => {
        if (loading) {
          return oldUsers;
        }
        const idx = getImprovementIndex(oldUsers, change.fullDocument);
        return updateValueAtIndex(oldUsers, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
        setUsers((oldUsers) => {
        if (loading) {
          return oldUsers;
        }
        const idx = getImprovementIndex(oldUsers, change.fullDocument);
        return replaceValueAtIndex(oldUsers, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
        setUsers((oldUsers) => {
        if (loading) {
          return oldUsers;
        }
        const idx = getImprovementIndex(oldUsers, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldUsers, idx);
        } else {
          return oldUsers;
        }
      });
    },
  });

  // Toggle admin status
  const toggleAdmin = async (user) => {
    await usersCollection.updateOne(
      { userid: user.userid },
      { $set: { admin: !user.admin } }
    );
  };

  return {
    loading,
    users,
    toggleAdmin
  };
}
