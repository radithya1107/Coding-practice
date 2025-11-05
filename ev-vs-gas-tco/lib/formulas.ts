export function computeTCO(params: {
  years: number;
  annualMileage: number;
  evPrice: number;
  evIncentive: number;
  gasPrice: number;
  cEV: number;
  cGas: number;
  maintDeltaPerYear: number; // EV - Gas (can be negative)
  resalePctEV: number;       // % of EV price at 5y
  resalePctGas: number;      // % of Gas price at 5y
}) {
  const {
    years: Y,
    annualMileage: M,
    evPrice,
    evIncentive,
    gasPrice,
    cEV,
    cGas,
    maintDeltaPerYear,
    resalePctEV,
    resalePctGas,
  } = params;

  const kmTotal = M * Y;

  const energyEV = cEV * kmTotal;
  const energyGas = cGas * kmTotal;

  const maintDelta = maintDeltaPerYear * Y;

  const resaleEV = (resalePctEV / 100) * evPrice;
  const resaleGas = (resalePctGas / 100) * gasPrice;

  const upfrontEV = evPrice - evIncentive;
  const upfrontGas = gasPrice;

  const tcoEV = upfrontEV + energyEV + maintDelta - resaleEV;
  const tcoGas = upfrontGas + energyGas - resaleGas;

  const cpkEV = kmTotal > 0 ? tcoEV / kmTotal : 0;
  const cpkGas = kmTotal > 0 ? tcoGas / kmTotal : 0;

  return {
    // components
    kmTotal,
    energyEV,
    energyGas,
    maintDelta,
    resaleEV,
    resaleGas,
    upfrontEV,
    upfrontGas,
    // totals
    tcoEV,
    tcoGas,
    // per-km
    cpkEV,
    cpkGas,
    // diffs
    diffTCO: tcoEV - tcoGas,
    diffCPK: cpkEV - cpkGas,
  };
}

