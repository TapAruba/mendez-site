export const siteConfig = {
  name: "Méndez Estates Aruba",
  url: "https://mendezestatesaruba.com",
  phone: "+2975924433",
  email: "mendezestatesaruba@gmail.com",
  message: "Hola, me interesa conocer más sobre Méndez Estates Aruba 🌴",
  serviceLinks: {
    massage: "/experiences/massage",
    dinner: "/experiences/private-chef",
    tour: "/experiences/island-tours",
    car: "/car-rental",
  },
};

export function whatsappLink(msg?: string) {
  const text = encodeURIComponent(msg ?? siteConfig.message);
  return `https://wa.me/${siteConfig.phone}?text=${text}`;
}
