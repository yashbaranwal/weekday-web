/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors: true,
    },
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'encrypted-tbn0.gstatic.com',
              port: '',
              pathname: '/images/**',
            },
          ],
      
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // Ensure fs module is not bundled on the client-side
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }

        return config;
    },
};

export default nextConfig;