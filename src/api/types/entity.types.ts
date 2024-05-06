import { PermissionsModal } from "./permission.types";

export const ENTITIES = {} as const;

export type EntityLifecycleStage = "active" | "deleted";

export interface EntityBase extends PermissionsModal {
  id: string;
  _application_id: string;
  _created_at: string;
  _updated_at: string;
  _lifecycle_stage: EntityLifecycleStage;
}
