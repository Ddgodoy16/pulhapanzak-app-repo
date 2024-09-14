import { Timestamp } from "firebase/firestore";

export interface Gallery {
    active: boolean;
    createdAt: Timestamp;
    createdBy: string;
    description: string;
    photo: string;
    placeName: string;
    uid: string;
  }
 