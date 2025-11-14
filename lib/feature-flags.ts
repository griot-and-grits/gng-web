export interface FeatureFlags {
    askTheGriot: boolean;
    goFundMe: boolean;
}

export interface GoFundMeConfig {
    campaignId: string | null;
    enabled: boolean;
    useEmbedded: boolean;
}

/**
 * Server-side feature flags configuration.
 * These flags are read at build time and can be overridden by environment variables.
 */
const defaultFeatureFlags: FeatureFlags = {
    askTheGriot: true, // Default to enabled
    goFundMe: true, // Default to enabled
};

/**
 * Get feature flags from environment variables or default configuration.
 * This function runs on the server side only.
 */
export function getFeatureFlags(): FeatureFlags {
    return {
        askTheGriot: process.env.FEATURE_ASK_THE_GRIOT !== 'false',
        goFundMe: process.env.FEATURE_GOFUNDME !== 'false',
    };
}

/**
 * Get GoFundMe configuration from environment variables.
 * This function runs on the server side only.
 */
export function getGoFundMeConfig(): GoFundMeConfig {
    const campaignId = process.env.GOFUNDME_CAMPAIGN_ID || '731313';
    const enabled = isFeatureEnabled('goFundMe') && campaignId !== null;
    const useEmbedded = process.env.GOFUNDME_USE_EMBEDDED === 'true'; // Default to false (external links)

    return {
        campaignId,
        enabled,
        useEmbedded,
    };
}

/**
 * Check if a specific feature is enabled.
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    const flags = getFeatureFlags();
    return flags[feature];
}