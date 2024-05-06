import { Schema } from "./schema.types";

export enum API_DS_AGGS_OP {
  AVERAGE = "avg",
  DELTA = "delta",
  SUM = "sum",
  FIRST = "first",
  LAST = "last",
  COUNT = "count",
  MIN = "min",
  MAX = "max",
  STANDARD_DEVIATION = "std",
  NULL = "null",
  NOT_NULL = "not_null",
}

export enum API_DS_INTERVAL {
  DAY = "d",
  HOUR = "h",
  MINUTE = "m",
  MONTH = "M",
  QUARTER = "q",
  SECOND = "s",
  WEEK = "w",
  YEAR = "y",
}

export type FILTER_VAL =
  | number[]
  | (string | number)[]
  | string[]
  | boolean
  | null
  | number
  | string
  | undefined;

export enum API_SORT_ORDER {
  DESCENDING = -1,
  ASCENDING = 1,
}

export enum API_FILTER_OPERATION {
  CONTAINS = "contains",
  DCONTAINS = "dcontains",
  EQUAL = "=",
  GEO_WITHIN = "gwithin",
  GREATER = ">",
  GREATER_OR_EQUAL = ">=",
  INCLUDES = "IN",
  LCONTAINS = "lcontains",
  LESS = "<",
  LESS_OR_EQUAL = "<=",
  NOT_EQUAL = "!=",
  NOT_INCLUDES = "NOT IN",
  TEXT_SEARCH = "stext",
}

export interface QueryParamFilter<TKeys = string> {
  filterCol?: TKeys | "$text";
  filterOp?: API_FILTER_OPERATION;
  filterVal?: FILTER_VAL;
}

export type QueryParamFilters<TKeys = string> = QueryParamFilter<TKeys>[];

export interface QueryParamSorters<TKeys = string> {
  sortCol?: TKeys;
  sortOrder?: API_SORT_ORDER;
}

export interface QueryParamProcessed {
  cols?: string;
  cumulative?: boolean;
  ds_nb_pts?: string;
  filter_cols?: string | number;
  filter_ops?: string | number;
  filter_vals?: string | number;
  gds_bds?: string;
  gds_cols?: string;
  gds_ncells?: number;
  logical_op?: "and" | "or";
  neighbors?: string;
  page_num?: number;
  page_size?: number;
  sort_col?: string;
  sort_order?: string;
}

export interface APIMeta<TFieldsIdKeys> {
  count: number;
  depth_max?: number;
  depth_min?: number;
  global_count: number;
  overall_count: number;
  overall_depth_max?: number;
  overall_depth_min?: number;
  overall_time_max?: string;
  overall_time_min?: string;
  schema: Schema<TFieldsIdKeys>;
  time_max?: string;
  time_min?: string;
  other_entities_schemas?: Record<string, Schema<TFieldsIdKeys>>;
}

export interface ApiQueryParams<TKeys = string, TNeighbor = string> {
  cumulative?: boolean;
  logicalOp?: "and" | "or";
  neighbors?: TNeighbor[];
  pageNum?: number;
  pageSize?: number;
  cols?: TKeys[];
  dsNbPts?: number;
  dsAggOp?: "avg";
  dsInterval?: API_DS_INTERVAL;
  sorters?: QueryParamSorters<TKeys>[];
  filters?: QueryParamFilter<TKeys>[];
  gdsCols?: string;
  gdsNcells?: number;
  gdsBds?: string;
  sample_size?: number;
}
