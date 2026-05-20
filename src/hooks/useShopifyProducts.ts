/**
 * ⚠️ 已弃用 — 项目已切换至 WordPress + WooCommerce Store API
 * 参见: src/hooks/useWooCommerceProducts.ts
 */
import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';

const STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'hn1ha0-mz.myshopify.com';
const API_URL = `https://${STORE_DOMAIN}/api/2025-01/graphql.json`;

// ─── GraphQL fragments ───────────────────────────────────────────────
const PRODUCT_FRAGMENT = `
  id
  title
  description
  handle
  tags
  collections(first: 1) {
    edges { node { handle } }
  }
  priceRange {
    minVariantPrice { amount currencyCode }
  }
  images(first: 6) {
    edges { node { url altText } }
  }
  options(first: 5) {
    id name values
  }
  variants(first: 100) {
    edges {
      node {
        id
        title
        availableForSale
        selectedOptions { name value }
      }
    }
  }
`;

const PRODUCTS_QUERY = `
  query allProducts($first: Int!) {
    products(first: $first) {
      edges { node { ${PRODUCT_FRAGMENT} } }
    }
  }
`;

const COLLECTION_QUERY = `
  query collectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        edges { node { ${PRODUCT_FRAGMENT} } }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query singleProduct($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FRAGMENT}
    }
  }
`;

// ─── Types ───────────────────────────────────────────────────────────
interface ImageEdge {
  node: {
    url: string;
    altText: string | null;
  };
}

interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface OptionNode {
  id: string;
  name: string;
  values: string[];
}

interface CollectionEdge {
  node: {
    handle: string;
  };
}

interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  collections: {
    edges: CollectionEdge[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: ImageEdge[];
  };
  options: OptionNode[];
  variants: {
    edges: Array<{ node: VariantNode }>;
  };
}

// ─── Mapper ──────────────────────────────────────────────────────────
function mapShopifyProduct(node: ShopifyProductNode): Product {
  // Extract collection handle (oriental / modern)
  const collectionHandle =
    node.collections?.edges?.[0]?.node?.handle || 'modern';
  const collection = collectionHandle === 'oriental' ? 'oriental' : 'modern';

  // Extract numeric ID from gid://shopify/Product/123456789 format
  const numericId = node.id.replace(/^gid:\/\/shopify\/Product\//, '');

  // Colours
  const colorOption = node.options.find(
    (o) =>
      typeof o.name === 'string' &&
      (o.name.toLowerCase().includes('color') ||
        o.name.toLowerCase().includes('颜色') ||
        o.name.toLowerCase().includes('カラー')),
  );
  const colors = colorOption?.values || [];

  // Sizes
  const sizeOption = node.options.find(
    (o) =>
      typeof o.name === 'string' &&
      (o.name.toLowerCase().includes('size') ||
        o.name.toLowerCase().includes('尺码') ||
        o.name.toLowerCase().includes('サイズ')),
  );
  const sizes = sizeOption?.values || [];

  // Images
  const images = (node.images?.edges || []).map((e) => e.node.url);

  // Price (CNY)
  const rawPrice = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const price = Math.round(rawPrice * 100) / 100;

  // In stock
  const variants = node.variants?.edges || [];
  const inStock = variants.some((v) => v.node.availableForSale);

  // Is new (from tags)
  const isNew =
    Array.isArray(node.tags) &&
    node.tags.some(
      (t) =>
        typeof t === 'string' &&
        (t.toLowerCase().includes('new') || t.toLowerCase().includes('新品')),
    );

  return {
    id: numericId,
    name: node.title,
    nameJa: node.title, // placeholder – Shopify doesn't have multilingual title by default
    nameEn: node.title,
    price,
    collection,
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=800'],
    description: node.description || '',
    descriptionJa: node.description || '',
    descriptionEn: node.description || '',
    colors: colors.length > 0 ? colors : ['默认'],
    sizes: sizes.length > 0 ? sizes : ['均码'],
    inStock,
    isNew,
  };
}

// ─── Fetch helper ────────────────────────────────────────────────────
async function shopifyFetch(query: string, variables: Record<string, unknown> = {}): Promise<unknown> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || 'GraphQL error');
  return json;
}

// ─── Hooks ───────────────────────────────────────────────────────────

/**
 * Fetch all products from Shopify Storefront API.
 * @param limit Maximum number of products to fetch (default 50).
 */
export function useAllProducts(limit = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = (await shopifyFetch(PRODUCTS_QUERY, { first: limit })) as {
        data: { products: { edges: Array<{ node: ShopifyProductNode }> } };
      };
      const mapped = json.data.products.edges.map((e) => mapShopifyProduct(e.node));
      setProducts(mapped);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

/**
 * Fetch products filtered by collection handle (e.g. "oriental" or "modern").
 */
export function useProductsByCollection(collectionHandle: string, limit = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!collectionHandle) return;
    setLoading(true);
    setError(null);
    try {
      const json = (await shopifyFetch(COLLECTION_QUERY, {
        handle: collectionHandle,
        first: limit,
      })) as {
        data: {
          collection: {
            products: { edges: Array<{ node: ShopifyProductNode }> };
          } | null;
        };
      };
      const col = json.data.collection;
      const mapped = col
        ? col.products.edges.map((e) => mapShopifyProduct(e.node))
        : [];
      setProducts(mapped);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [collectionHandle, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

/**
 * Fetch a single product by handle (slug).
 */
export function useProduct(handle: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!handle) return;
    setLoading(true);
    setError(null);
    try {
      const json = (await shopifyFetch(PRODUCT_QUERY, { handle })) as {
        data: { product: ShopifyProductNode | null };
      };
      if (json.data.product) {
        setProduct(mapShopifyProduct(json.data.product));
      } else {
        setProduct(null);
        setError('商品未找到');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [handle]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}