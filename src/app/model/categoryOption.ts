export interface CategoryOption {
  id: number;
  name: string;
  icon?: string;
  type: string;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  value?: number;
}

export type CategoryOptions = Record<string, CategoryOption[]>;
