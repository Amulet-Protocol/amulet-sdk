export type SimulateData = {
  logs?: string[];
  simulationResponse?: {
    logs?: string[];
  };
};

export type GetPremiumData = {
  premium_currency: string;
  premium_amount: number;
  discount_amount: number;
  unit_cost: number;
};
