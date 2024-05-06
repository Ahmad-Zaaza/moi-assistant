import { useEffect, useRef } from "react";
import { CustomChart, LineChart, LineSeriesOption } from "echarts/charts";
import { getInstanceByDom, init, use } from "echarts/core";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption, ECharts, SetOptionOpts } from "echarts/core";
import type {
  GridComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
} from "echarts/components";

// Treeshaking - Register the required components
use([
  CanvasRenderer,
  CustomChart,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  TitleComponent,
  TooltipComponent,
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
  | GridComponentOption
  | LineSeriesOption
  | TitleComponentOption
  | ToolboxComponentOption
>;

interface Props {
  option: EChartsOption;
  settings?: SetOptionOpts;
  loading?: boolean;
}

export default function Echart({ option, settings, loading }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);
    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  useEffect(() => {
    // Update chart when options or settings change
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings]);

  useEffect(() => {
    // Update chart when loading changes
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading]);

  return <div ref={chartRef} className="w-full h-full" />;
}
