export interface FeatureFlags {
    askTheGriot: boolean;
}

/**
 * Server-side feature flags configuration.
 * These flags are read at build time and can be overridden by environment variables.
 */
const defaultFeatureFlags: FeatureFlags = {
    askTheGriot: true, // Default to enabled
};

/**
 * Get feature flags from environment variables or default configuration.
 * This function runs on the server side only.
 */
export function getFeatureFlags(): FeatureFlags {
    return {
        askTheGriot: process.env.FEATURE_ASK_THE_GRIOT !== 'false',
    };
}

/**
 * Check if a specific feature is enabled.
 */
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
    const flags = getFeatureFlags();
    return flags[feature];
}