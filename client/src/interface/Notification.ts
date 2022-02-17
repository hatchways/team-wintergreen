export interface Notification {
    type: string;
    description: string;
    read: boolean;
    createdBy: string;
    creatorPhotoKey: string;
    receivedBy: string;
    updatedAt: Date;
}
