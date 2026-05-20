/**
 * ⚠️ 已弃用 — 项目已切换至 WordPress + WooCommerce Store API
 * 参见: src/lib/woocommerce.ts / src/hooks/useWooCommerceProducts.ts
 */
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'hn1ha0-mz.myshopify.com';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: STORE_DOMAIN,
  apiVersion: '2025-01',
  publicAccessToken: 'placeholder', // Shopify 要求传值，用占位符即可
});

export const isShopifyConfigured = (): boolean => true;

export const getShopifyClient = async () => shopifyClient;
