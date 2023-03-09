// Generated by "npm run codegen". Do not modify this file manually.
import type { BN } from '@project-serum/anchor';
import type { PublicKey } from '@solana/web3.js';

export type QuotationMetadataState = {
  readonly quotationAdminAuthKey: PublicKey;
  readonly riskMarginPctg: BN;
  readonly expenseMarginPctg: BN;
  readonly slippageFactorPctg: BN;
  readonly defaultSettingStatus: boolean;
  readonly defaultLowSectionPctg: BN;
  readonly defaultHighSectionPctg: BN;
  readonly defaultLowSectionBaseUnitCostRatio: BN;
  readonly defaultMiddleSectionBaseUnitCostRatio: BN;
  readonly defaultHighSectionBaseUnitCostRatio: BN;
  readonly defaultHighSectionCeilingUnitCostRatio: BN;
  readonly overallSettingStatus: boolean;
  readonly overallIncreaseLowWatermarkPctg: BN;
  readonly overallIncreaseLowWatermarkRatio: BN;
  readonly overallIncreaseHighWatermarkPctg: BN;
  readonly overallIncreaseHighWatermarkRatio: BN;
  readonly nftCollections: NFTCollection[];
};
export type QuotationResultState = {
  readonly premiumCurrency: PublicKey;
  readonly premiumAmount: BN;
  readonly creatorKey: PublicKey;
  readonly discountAmount: BN;
};
export type QuotationState = {
  readonly quotationStatePdaBump: number;
  readonly quotationMetadataStateKey: PublicKey;
  readonly productId: BN;
  readonly productStateKey: PublicKey;
  readonly productDynamicSettingStatus: boolean;
  readonly productDynamicLowSectionPctg: BN;
  readonly productDynamicHighSectionPctg: BN;
  readonly productDynamicLowSectionBaseUnitCost: BN;
  readonly productDynamicMiddleSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionCeilingUnitCost: BN;
};
export type NFTCollection = {
  readonly tokenMint: PublicKey;
  readonly coverDiscountPctg: BN;
};
export type InitializeMetadataStateAccounts = {
  readonly programInitializerAuth: PublicKey | string;
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
  readonly sysvarRent: PublicKey | string;
  readonly systemProgram: PublicKey | string;
};
export type AdminUpdateAdminAuthInfoAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly newQuotationAdminAuth: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
  readonly sysvarRent: PublicKey | string;
};
export type AdminUpdateMetadataInfoParam = {
  readonly riskMarginPctg: BN;
  readonly expenseMarginPctg: BN;
  readonly slippageFactorPctg: BN;
  readonly defaultSettingStatus: boolean;
  readonly defaultLowSectionPctg: BN;
  readonly defaultHighSectionPctg: BN;
  readonly defaultLowSectionBaseUnitCostRatio: BN;
  readonly defaultMiddleSectionBaseUnitCostRatio: BN;
  readonly defaultHighSectionBaseUnitCostRatio: BN;
  readonly defaultHighSectionCeilingUnitCostRatio: BN;
  readonly overallSettingStatus: boolean;
  readonly overallIncreaseLowWatermarkPctg: BN;
  readonly overallIncreaseLowWatermarkRatio: BN;
  readonly overallIncreaseHighWatermarkPctg: BN;
  readonly overallIncreaseHighWatermarkRatio: BN;
};
export type AdminUpdateMetadataInfoAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
};
export type AdminAddNftCollectionParam = {
  readonly coverDiscountPctg: BN;
};
export type AdminAddNftCollectionAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly collectionMint: PublicKey | string;
  readonly collectionMasterEdition: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
};
export type AdminRemoveNftCollectionParam = {
  readonly index: BN;
};
export type AdminRemoveNftCollectionAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
};
export type AdminEnlargeAccountParam = {
  readonly targetLength: BN;
};
export type AdminEnlargeAccountAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
  readonly rentPayer: PublicKey | string;
  readonly account: PublicKey | string;
  readonly systemProgram: PublicKey | string;
};
export type AddQuotationStateParam = {
  readonly productId: BN;
  readonly productDynamicSettingStatus: boolean;
  readonly productDynamicLowSectionPctg: BN;
  readonly productDynamicHighSectionPctg: BN;
  readonly productDynamicLowSectionBaseUnitCost: BN;
  readonly productDynamicMiddleSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionCeilingUnitCost: BN;
};
export type AddQuotationStateAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
  readonly quotationState: PublicKey | string;
  readonly productState: PublicKey | string;
  readonly systemProgram: PublicKey | string;
};
export type UpdateQuotationStateParam = {
  readonly productId: BN;
  readonly productDynamicSettingStatus: boolean;
  readonly productDynamicLowSectionPctg: BN;
  readonly productDynamicHighSectionPctg: BN;
  readonly productDynamicLowSectionBaseUnitCost: BN;
  readonly productDynamicMiddleSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionBaseUnitCost: BN;
  readonly productDynamicHighSectionCeilingUnitCost: BN;
};
export type UpdateQuotationStateAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly quotationAdminAuth: PublicKey | string;
  readonly quotationState: PublicKey | string;
};
export type CreateQuotationResultStateAccounts = {
  readonly quotationResultState: PublicKey | string;
  readonly rentPayer: PublicKey | string;
  readonly systemProgram: PublicKey | string;
};
export type CloseQuotationResultStateAccounts = {
  readonly quotationResultState: PublicKey | string;
  readonly rentPayer: PublicKey | string;
};
export type GetPremiumParam = {
  readonly productId: BN;
  readonly coverCurrency: PublicKey;
  readonly coverDurationInDays: BN;
  readonly coverAmount: BN;
};
export type GetPremiumAccounts = {
  readonly programMetadataState: PublicKey | string;
  readonly productState: PublicKey | string;
  readonly quotationState: PublicKey | string;
  readonly quotationResultState: PublicKey | string;
  readonly poolMetadataState: PublicKey | string;
  readonly auwtState: PublicKey | string;
  readonly individualPoolState: PublicKey | string;
  readonly nftMetadataState: PublicKey | string;
};
