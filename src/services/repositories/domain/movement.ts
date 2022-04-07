import { MovementType } from "../../../common/enums/movement-type";

export interface Movement {
  id: number;
  user_id: number;
  type: MovementType;
  created_at: Date | null;
  updated_at: Date | null;
}
