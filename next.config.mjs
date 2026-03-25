


/** @type {import('next').NextConfig} */




const nextConfig = {
  compiler: {
    // Isso ativa o suporte para a tag <style jsx> que o curso usa
    styledComponents: true, 
  },
  // Garante que o pacote styled-jsx seja processado corretamente
  transpilePackages: ['styled-jsx'],
  trailingSlash: true,

  async redirects() {
    return [
      {
        source: '/perguntas',
        destination: '/faq',
        permanent: true, 
      }
    ]  
  },
};

export default nextConfig;