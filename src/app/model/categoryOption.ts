export type CategoryOption = {
  id: number;
  name: string;
  icon?: string;
  action: () => void;
};

export type CategoryOptions = {
  [key: string]: CategoryOption[];
};
