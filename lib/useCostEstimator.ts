"use client";

import { useState } from "react";
import {
  STARTER_TIER,
  FULL_LAUNCH_TIER,
  MOBILE_UX_ADDON,
  FULL_LAUNCH_MANAGEMENT,
  GENERAL_MANAGEMENT,
  SOLUTION_TRAINING,
  CREDIT_PACKS,
} from "./content";

// Slider bounds — mirror the price-range strings already in lib/content.ts
// (e.g. STARTER_TIER.price === "$150–$300"). Kept as plain numbers here
// since that field is display copy, not something to parse at runtime.
export const SETUP_TIERS = {
  starter: { ...STARTER_TIER, min: 150, max: 300 },
  fullLaunch: { ...FULL_LAUNCH_TIER, min: 400, max: 800 },
} as const;
export type SetupChoice = "none" | keyof typeof SETUP_TIERS;

export const MANAGEMENT_TIERS = {
  general: { ...GENERAL_MANAGEMENT, min: 80, max: 300 },
  fullLaunchMgmt: { ...FULL_LAUNCH_MANAGEMENT, min: 100, max: 300 },
} as const;
export type ManagementChoice = "none" | keyof typeof MANAGEMENT_TIERS;

export const MOBILE_UX_PRICE = 60; // mirrors MOBILE_UX_ADDON.price
export const TRAINING_PRICE = 200; // mirrors SOLUTION_TRAINING.price

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export { MOBILE_UX_ADDON, SOLUTION_TRAINING, CREDIT_PACKS };

/**
 * All Cost Estimator state and price math (PLAN.md Step 26), shared between
 * the desktop panel (CostEstimator.tsx) and the mobile step wizard
 * (mobile/CostEstimator.tsx, Step 32) so the two surfaces can't quote
 * different totals for the same selections.
 */
export function useCostEstimator() {
  const [setup, setSetupState] = useState<SetupChoice>("none");
  const [setupValue, setSetupValue] = useState<number>(SETUP_TIERS.starter.min);
  const [mobileUX, setMobileUX] = useState(false);
  const [management, setManagementState] = useState<ManagementChoice>("none");
  const [managementValue, setManagementValue] = useState<number>(
    MANAGEMENT_TIERS.general.min
  );
  const [creditsOn, setCreditsOn] = useState(false);
  const [creditPackIndex, setCreditPackIndex] = useState(0);
  const [trainingOn, setTrainingOn] = useState(false);

  function chooseSetup(next: SetupChoice) {
    setSetupState(next);
    if (next !== "none") setSetupValue(SETUP_TIERS[next].min);
    // Full Launch Management is exclusive to Full Launch buyers — drop it
    // the moment Full Launch stops being the selected setup tier.
    if (next !== "fullLaunch" && management === "fullLaunchMgmt") {
      setManagementState("none");
    }
  }

  function chooseManagement(next: ManagementChoice) {
    setManagementState(next);
    if (next !== "none") setManagementValue(MANAGEMENT_TIERS[next].min);
  }

  const setupCost = setup === "none" ? 0 : setupValue;
  const managementCost = management === "none" ? 0 : managementValue;
  const mobileUXCost = mobileUX ? MOBILE_UX_PRICE : 0;
  const pack = CREDIT_PACKS[creditPackIndex];
  const creditsCost = creditsOn ? Number(pack.price.slice(1)) : 0;
  const trainingCost = trainingOn ? TRAINING_PRICE : 0;

  const oneTime = setupCost + mobileUXCost + creditsCost + trainingCost;
  const monthly = managementCost;

  // "Too many" isn't about the setup tier (almost everyone picks one) — it's
  // about stacking every optional add-on at once.
  const addOnCount = [mobileUX, management !== "none", creditsOn, trainingOn].filter(
    Boolean
  ).length;
  const tooMany = addOnCount >= 3;

  return {
    setup,
    setupValue,
    mobileUX,
    management,
    managementValue,
    creditsOn,
    creditPackIndex,
    trainingOn,
    chooseSetup,
    setSetupValue,
    setMobileUX,
    chooseManagement,
    setManagementValue,
    setCreditsOn,
    setCreditPackIndex,
    setTrainingOn,
    setupCost,
    managementCost,
    mobileUXCost,
    pack,
    creditsCost,
    trainingCost,
    oneTime,
    monthly,
    addOnCount,
    tooMany,
  };
}
