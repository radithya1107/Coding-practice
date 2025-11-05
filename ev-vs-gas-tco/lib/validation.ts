import { z } from "zod";

export const schema = z.object({
  annualMileage: z.number().min(0).max(100_000),
  evPrice: z.number().min(0),
  gasPrice: z.number().min(0),
  evIncentive: z.number().min(0).refine((val, ctx) => {
    const root: any = ctx.parent;
    return typeof root?.evPrice === "number" ? val <= root.evPrice : true;
  }, "Incentive cannot exceed EV price"),
  cEV: z.number().min(0).max(100),
  cGas: z.number().min(0).max(100),
  maintDeltaPerYear: z.number(), // can be negative
  resalePctEV: z.number().min(0).max(100),
  resalePctGas: z.number().min(0).max(100),
  years: z.number().min(1).max(20),
});

export const defaults = {
  annualMileage: 12000,
  evPrice: 3000000,     // e.g., ₹30,00,000
  gasPrice: 2000000,    // e.g., ₹20,00,000
  evIncentive: 150000,  // e.g., ₹1,50,000
  cEV: 1.5,             // currency per km
  cGas: 6.5,            // currency per km
  maintDeltaPerYear: -5000, // EV cheaper per year
  resalePctEV: 45,
  resalePctGas: 40,
  years: 5,
};

