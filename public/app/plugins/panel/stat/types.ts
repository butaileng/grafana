import { SingleStatBaseOptions, BigValueColorMode, BigValueGraphMode, BigValueJustifyMode } from '@grafana/ui';
import {
  VizOrientation,
  ReducerID,
  FieldDisplayOptions,
  SelectableValue,
  FieldConfigSource,
  ThresholdsMode,
} from '@grafana/data';
import { PanelOptionsEditorBuilder } from '@grafana/data/src/utils/OptionsUIBuilders';

// Structure copied from angular
export interface StatPanelOptions extends SingleStatBaseOptions {
  graphMode: BigValueGraphMode;
  colorMode: BigValueColorMode;
  justifyMode: BigValueJustifyMode;
}

export const colorModes: Array<SelectableValue<BigValueColorMode>> = [
  { value: BigValueColorMode.Value, label: 'Value' },
  { value: BigValueColorMode.Background, label: 'Background' },
];

export const graphModes: Array<SelectableValue<BigValueGraphMode>> = [
  { value: BigValueGraphMode.None, label: 'None' },
  { value: BigValueGraphMode.Area, label: 'Area graph' },
];

export const justifyModes: Array<SelectableValue<BigValueJustifyMode>> = [
  { value: BigValueJustifyMode.Auto, label: 'Auto' },
  { value: BigValueJustifyMode.Center, label: 'Center' },
];

export const standardFieldDisplayOptions: FieldDisplayOptions = {
  values: false,
  calcs: [ReducerID.mean],
};

export const standardFieldConfig: FieldConfigSource = {
  defaults: {
    thresholds: {
      mode: ThresholdsMode.Absolute,
      steps: [
        { value: -Infinity, color: 'green' },
        { value: 80, color: 'red' }, // 80%
      ],
    },
    mappings: [],
  },
  overrides: [],
};

export function addStandardSingleValueOptions(builder: PanelOptionsEditorBuilder) {
  builder.addRadio({
    id: 'values',
    name: 'Show',
    description: 'Calculate a single value per colum or series or show each row',
    settings: {
      options: [
        { value: false, label: 'Calculate' },
        { value: true, label: 'All values' },
      ],
    },
  });
}

export const defaults: StatPanelOptions = {
  graphMode: BigValueGraphMode.Area,
  colorMode: BigValueColorMode.Value,
  justifyMode: BigValueJustifyMode.Auto,
  fieldOptions: standardFieldDisplayOptions,
  orientation: VizOrientation.Auto,
};
