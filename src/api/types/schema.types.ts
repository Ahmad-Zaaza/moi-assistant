export enum SCHEMA_TYPE {
  BOOLEAN = "boolean",
  GEO_POINT = "geo_point",
  LIST = "list",
  LIST_NUMBER = "list_number",
  LIST_STRING = "list_string",
  NUMBER = "number",
  OBJECT = "object",
  STRING = "string",
  TIME = "time",
  FILE = "file",
}

export type SchemaItemOptions = string[];

/**
 *  Describes the format of data.
 *  The name key represents the key of the property in the instance
 */
export interface SchemaItem<TNameKeys = string> {
  default?: string | number | boolean;
  desc?: string;
  is_foreign_key?: boolean;
  is_meta_property?: boolean;
  label: string;
  name: TNameKeys;
  required?: boolean;
  scope?: string;
  secret?: boolean;
  type: SCHEMA_TYPE;
  unit?: string;
  validation_regex?: string;
  options?: SchemaItemOptions;
  unit_family?: string;
}

export type SchemaItemKeys = keyof SchemaItem;

export type Schema<TNameKeys = string> = SchemaItem<TNameKeys>[];
