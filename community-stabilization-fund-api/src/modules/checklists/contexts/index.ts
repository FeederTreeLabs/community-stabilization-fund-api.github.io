import { createContext } from 'react';

export interface ChecklistRule {
  householdMembers?: string;
  itemQuantity?: string;
  packageItem?: string;
  packageGroup?: string;
  delayedBy?: {
    days?: number;
    weeks?: number;
  };
  bagLabelType?: string;
}

interface ChecklistsRulesContextProps {
  rules: ChecklistRule[];
  updateRules?: Function;
  bagLabelType?: string;
  updateBagLabelType?: Function;
}

export const ChecklistsRulesContext =
  createContext<ChecklistsRulesContextProps>({ rules: [], bagLabelType: '' });