export type TimeUnit = "d" | "m" | "y";

export interface LifespanInterface {
  value: number;
  unit: TimeUnit;
}

export type ConsumableStatus = "active" | "needs_replacement" | "replaced";

export interface ConsumableStatusInterface {
  type: string;
  lifespan: LifespanInterface;
  installedAt: Date;
  nextReplacementAt: Date;
  status: ConsumableStatus;
}

export interface ConsumableStatusSetInterface {
  filter1: ConsumableStatusInterface;
  filter2: ConsumableStatusInterface;
  filter3: ConsumableStatusInterface;
  filterRO: ConsumableStatusInterface;
  filter4: ConsumableStatusInterface;
  filter5: ConsumableStatusInterface;
  filter6: ConsumableStatusInterface;
  filter7: ConsumableStatusInterface;
}

export const defaultConsumableStatus: ConsumableStatusSetInterface = {
  filter1: {
    type: "濾芯 1 號",
    lifespan: { value: 6, unit: "m" },
    installedAt: new Date(),
    nextReplacementAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    status: "active",
  },
  filter2: {
    type: "濾芯 2 號",
    lifespan: { value: 6, unit: "m" },
    installedAt: new Date(),
    nextReplacementAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    status: "active",
  },
  filter3: {
    type: "濾芯 3 號",
    lifespan: { value: 6, unit: "m" },
    installedAt: new Date(),
    nextReplacementAt: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    status: "active",
  },
  filterRO: {
    type: "濾芯 RO 膜",
    lifespan: { value: 2, unit: "y" },
    installedAt: new Date(),
    nextReplacementAt: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2)
    ),
    status: "active",
  },
  filter4: {
    type: "濾芯 4 號",
    lifespan: { value: 9, unit: "y" },
    installedAt: new Date(),
    nextReplacementAt: new Date(
      new Date().setFullYear(new Date().getFullYear() + 9)
    ),
    status: "active",
  },
  filter5: {
    type: "濾芯 5 號",
    lifespan: { value: 4, unit: "y" },
    installedAt: new Date(),
    nextReplacementAt: new Date(
      new Date().setFullYear(new Date().getFullYear() + 4)
    ),
    status: "active",
  },
  filter6: {
    type: "濾芯 6 號",
    lifespan: { value: 2.5, unit: "y" },
    installedAt: new Date(),
    nextReplacementAt: new Date(
      new Date().setFullYear(new Date().getFullYear() + 2.5)
    ),
    status: "active",
  },
  filter7: {
    type: "濾芯 7 號",
    lifespan: { value: 1.75, unit: "y" },
    installedAt: new Date(),
    nextReplacementAt: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1.75)
    ),
    status: "active",
  },
};
