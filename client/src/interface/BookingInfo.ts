import { User } from './User';

export interface BookingInfo {
  id: number;
  petOwner: User;
  sitter: User;
  startDate: Date;
  endDate: Date;
  status: string;
  paid: boolean;
}
