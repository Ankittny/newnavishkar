/** @type {import('next').NextConfig} */
const nextConfig = {};



export default nextConfig;

// import { createProxyMiddleware } from 'http-proxy-middleware';

// export default {
//   async rewrites() {
//     return [
//       {
//         source: '/api/v1/:path*', // Proxy any path under '/api/v1/'
//         destination: 'https://navishkar.skylabsapp.com/api/v1/:path*', // Proxy to your backend API
//       },
//     ];
//   },
//   // If you're using createProxyMiddleware elsewhere, ensure to add that logic too.
// };