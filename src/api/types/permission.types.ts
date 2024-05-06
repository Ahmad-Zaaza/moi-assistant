export interface PermissionsModal {
  _other_permissions?: string[];
  _owner_permissions?: string[];
  _owner_id?: string;
  _roles?: string[];
  _role_permissions?: string[];
}

export type PermissionsKeys = keyof PermissionsModal;
