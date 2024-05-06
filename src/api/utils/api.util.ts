import {
  FILTER_VAL,
  QueryParamFilter,
  QueryParamSorters,
  ApiQueryParams,
  QueryParamProcessed,
} from "api";

const DELIMITER = {
  VALUE: "|",
  ARRAY: ";",
};

const convertArrayToParamsValue = <T>(
  items: T[] | undefined,
  delimiter = DELIMITER.VALUE
) =>
  items?.length
    ? items.reduce(
        (acc, c, index) => (index === 0 ? acc + c : acc + delimiter + c),
        ""
      )
    : undefined;

const processFilterValues = (items: FILTER_VAL) =>
  Array.isArray(items)
    ? convertArrayToParamsValue(items, DELIMITER.ARRAY)
    : items;

const processFilters = <TKey = string>(
  filters: QueryParamFilter<TKey>[] | undefined
): {
  filter_cols?: string | number;
  filter_ops?: string | number;
  filter_vals?: string | number;
} => {
  const validFilters = filters?.filter(
    (filter) => filter.filterVal !== undefined
  );
  if (validFilters?.length === 0) {
    return {};
  }

  return (
    validFilters?.reduce(
      (acc, p, index) => {
        if (p.filterVal === undefined) {
          return acc;
        }
        const filterValue = processFilterValues(p.filterVal);
        return {
          filter_cols:
            index === 0
              ? acc.filter_cols + p.filterCol
              : acc.filter_cols + DELIMITER.VALUE + p.filterCol,
          filter_ops:
            index === 0
              ? acc.filter_ops + p.filterOp
              : acc.filter_ops + DELIMITER.VALUE + p.filterOp,
          filter_vals:
            index === 0
              ? acc.filter_vals + filterValue
              : acc.filter_vals + DELIMITER.VALUE + filterValue,
        };
      },
      {
        filter_cols: "",
        filter_ops: "",
        filter_vals: "",
      }
    ) ?? {}
  );
};

const processSorters = <TKey = string>(
  sorters: QueryParamSorters<TKey>[] | undefined
) => {
  const filteredSorted = sorters?.filter((s) => s.sortCol && s.sortOrder);
  if (!filteredSorted || filteredSorted.length < 1) return undefined;
  return filteredSorted.reduce(
    (acc, sorter, index) => ({
      sort_col:
        index === 0
          ? acc.sort_col + sorter.sortCol
          : acc.sort_col + DELIMITER.VALUE + sorter.sortCol,
      sort_order:
        index === 0
          ? acc.sort_order + sorter.sortOrder
          : acc.sort_order + DELIMITER.VALUE + sorter.sortOrder,
    }),
    { sort_col: "", sort_order: "" }
  );
};

const processParams = <TKey>(
  queryParams?: ApiQueryParams<TKey>
): QueryParamProcessed => {
  const params = {
    cumulative: queryParams?.cumulative,
    logical_op: queryParams?.logicalOp,
    page_num: queryParams?.pageNum,
    page_size: queryParams?.pageSize,
    gds_cols: queryParams?.gdsCols,
    gds_ncells: queryParams?.gdsNcells,
    gds_bds: queryParams?.gdsBds,
    neighbors: convertArrayToParamsValue<string>(queryParams?.neighbors),
    cols: convertArrayToParamsValue<TKey>(queryParams?.cols),
    ds_nb_pts: queryParams?.dsNbPts,
    ds_agg_op: queryParams?.dsAggOp,
    ds_interval: queryParams?.dsInterval,
    sample_size: queryParams?.sample_size,
    ...processFilters<TKey>(queryParams?.filters),
    ...processSorters<TKey>(queryParams?.sorters),
  };
  return Object.entries(params).reduce(
    (acc, [key, value]) =>
      value === undefined ? acc : { ...acc, [key]: value },
    {}
  );
};

const ApiUtils = {
  processParams,
};

export default ApiUtils;
