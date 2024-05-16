import City from './City';
import Status from './Status';
import Theme from './Theme';

const MAX_ROADMAPS_COUNT = 3;

export default interface User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  is_superuser: boolean;
  image: string;
  about_self: string;
  user_status: Status;
  user_directions: Theme[];
  location: City;
  email: string;
  phone_number: string;
  birthdate: Date;
};

export {MAX_ROADMAPS_COUNT};
