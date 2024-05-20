const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "fakestoreapi.com",
          port: "",
          pathname: "/img/**",
        },
      ],
    },
  }
  
  export default nextConfig