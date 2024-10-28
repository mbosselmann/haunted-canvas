export interface CategoryOption {
  id: number;
  name: string;
  icon?: string;
  action: () => void;
}

export type CategoryOptions = Record<string, CategoryOption[]>;
