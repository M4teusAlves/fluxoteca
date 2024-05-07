/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/signin',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
