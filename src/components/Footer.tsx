
import React from "react";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const products = [
    { name: "شُنط سوفت للمحلات الملابس", id: "2" },
    { name: "أكياس سلوفان بشريط لاصق", id: "4" },
    { name: "شنط قماش", id: "3" },
    { name: "أكياس مطبوعة", id: "1" },
    { name: "أكياس ذات غالق - Ziplock Bags", id: "5" },
  ];

  const quickLinks = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'من نحن', id: 'about' },
    { label: 'منتجاتنا', id: 'products' },
    { label: 'مميزاتنا', id: 'features' },
    { label: 'آراء العملاء', id: 'testimonials' },
    { label: 'تواصل معنا', id: 'contact' },
  ];

  return (
    <footer className="bg-[hsl(203,100%,8%)] text-white">
      <div className="container-custom py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <img src="/lovable-uploads/2e4ebc83-a888-418c-ad4a-41201a5949bb.png" alt="البركة بلاست" className="h-14 mb-4 brightness-200" />
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              نحن متخصصون في صناعة الأكياس البلاستيكية بجودة عالية منذ عام 2011.
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <a href="#" className="bg-white/10 hover:bg-secondary p-2.5 rounded-xl transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary p-2.5 rounded-xl transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="text-white/60 hover:text-secondary transition-colors text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5">منتجاتنا</h4>
            <ul className="space-y-2.5">
              {products.map((product) => (
                <li key={product.id}>
                  <button onClick={() => navigate(`/products/${product.id}`)} className="text-white/60 hover:text-secondary transition-colors text-sm">
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-5">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-secondary mt-1 shrink-0" />
                <span className="text-white/60 text-sm">قليوب - طريق مصر اسكندريه الزراعي، المنطقة الصناعية الأولي</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <span className="text-white/60 dir-ltr text-sm">01009923040</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span className="text-white/60 text-sm">info@elbarkaplast.com</span>
              </li>
            </ul>

            <div className="mt-5 rounded-xl overflow-hidden shadow-md h-40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4401111516273!2d46.75606387584941!3d24.719785978978414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0336b3cd4021%3A0x819fcf3c87518671!2sIndustrial%20City%202%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1712685247097!5m2!1sen!2ssa"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="موقع البركة بلاست"
              />
            </div>
          </div>
        </div>

        <div className={cn("border-t border-white/10 mt-12 pt-6", "flex flex-col md:flex-row justify-between items-center")}>
          <p className="text-white/50 text-sm">&copy; {currentYear} البركة بلاست. جميع الحقوق محفوظة</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 space-x-reverse">
              <li><a href="#" className="text-white/50 hover:text-secondary text-sm transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-white/50 hover:text-secondary text-sm transition-colors">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
