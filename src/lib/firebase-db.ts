
import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";

// This file is now redundant as db is exported from firebase.ts
// but we will keep it for now to avoid breaking other imports
// and clean it up in a later step.
export const db = getFirestore(app);

    