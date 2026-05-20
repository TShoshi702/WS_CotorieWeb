export type Language = 'zh' | 'ja' | 'en';

export interface Translation {
  nav: {
    home: string;
    collections: string;
    oriental: string;
    modern: string;
    about: string;
    contact: string;
  };
  hero: {
    subtitle: string;
    cta: string;
  };
  collections: {
    title: string;
    orientalTitle: string;
    orientalTitleJa: string;
    modernTitle: string;
    modernTitleJa: string;
    viewAll: string;
  };
  products: {
    featuredOriental: string;
    featuredModern: string;
    viewAll: string;
    addToCart: string;
    outOfStock: string;
  };
  productDetail: {
    price: string;
    description: string;
    color: string;
    size: string;
    quantity: string;
    addToCart: string;
    addToBag: string;
    details: string;
    care: string;
    shipping: string;
  };
  cart: {
    title: string;
    empty: string;
    continueShopping: string;
    subtotal: string;
    checkout: string;
    remove: string;
  };
  footer: {
    customerService: string;
    aboutCotorie: string;
    followUs: string;
    newsletter: string;
    subscribe: string;
    privacy: string;
    terms: string;
  };
  brand: {
    slogan: string;
    story: string;
  };
  cat1: {
    title: string;
    desc: string;
    link: string;
  };
  cat2: {
    title: string;
    desc: string;
    link: string;
  };
  productsSection: {
    tag: string;
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
  };
}

export interface Product {
  id: string;
  name: string;
  nameJa: string;
  nameEn: string;
  price: number;
  collection: 'oriental' | 'modern';
  images: string[];
  description: string;
  descriptionJa: string;
  descriptionEn: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}
