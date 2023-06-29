import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getImprovementIndex,
} from "../utils";

const { dataSourceName } = atlasConfig;

export function useImprovments() {
  // Set up a list of improvements in state
  const app = useApp();
  const [improvements, setImprovements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the improvement item collection
  const improvementItemCollection = useCollection({
    cluster: dataSourceName,
    db: "requestly",
    collection: "improvements",
  });

  // Fetch all improvements on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    let shouldUpdate = true;
    const fetchImprovements = improvementItemCollection.find({})
    if (shouldUpdate) {
        fetchImprovements.then((fetchedImprovements) => {
        setImprovements(fetchedImprovements);
        setLoading(false);
      });
    }
    return () => {
      shouldUpdate = false;
    }
  }, [improvementItemCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(improvementItemCollection, {
    onInsert: (change) => {
        setImprovements((oldImprovements) => {
        if (loading) {
          return oldImprovements;
        }
        const idx =
        getImprovementIndex(oldImprovements, change.fullDocument) ?? oldImprovements.length;
        if (idx === oldImprovements.length) {
          return addValueAtIndex(oldImprovements, idx, change.fullDocument);
        } else {
          return oldImprovements;
        }
      });
    },
    onUpdate: (change) => {
        setImprovements((oldImprovements) => {
        if (loading) {
          return oldImprovements;
        }
        const idx = getImprovementIndex(oldImprovements, change.fullDocument);
        return updateValueAtIndex(oldImprovements, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
        setImprovements((oldImprovements) => {
        if (loading) {
          return oldImprovements;
        }
        const idx = getImprovementIndex(oldImprovements, change.fullDocument);
        return replaceValueAtIndex(oldImprovements, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
        setImprovements((oldImprovements) => {
        if (loading) {
          return oldImprovements;
        }
        const idx = getImprovementIndex(oldImprovements, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldImprovements, idx);
        } else {
          return oldImprovements;
        }
      });
    },
  });

  // Given a draft improvment, format it and then insert it
  const saveImprovement = async (draftImprovement) => {
      try {
        await improvementItemCollection.insertOne(draftImprovement);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that this app tried to insert an improvement multiple times (i.e. an existing improvement has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
  };

  // Toggle whether or not a given improvment is complete
  const toggleImprovement = async (improvement) => {
    await improvementItemCollection.updateOne(
      { _id: improvement._id },
      { $set: { isComplete: !improvement.isComplete } }
    );
  };

  // Delete a given improvement
  const deleteImprovement = async (improvement) => {
    await improvementItemCollection.deleteOne({ _id: improvement._id });
  };

  return {
    loading,
    improvements,
    saveImprovement,
    toggleImprovement,
    deleteImprovement,
  };
}
