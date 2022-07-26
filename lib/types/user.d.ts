import { Site } from "./site";
import { Roles } from "./roles";

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: Roles;
    createdAt: string;
    updatedAt: string;
    lastLogin: string;
    sites: Site[];
}