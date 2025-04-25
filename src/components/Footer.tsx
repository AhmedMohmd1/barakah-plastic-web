import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold font-cairo mb-4">البركة بلاست</h3>
            <p className="text-white/80 mb-6">
              نحن متخصصون في صناعة الأكياس البلاستيكية بجودة عالية منذ عام 2011.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="bg-white/10 hover:bg-secondary/80 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary/80 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary/80 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-secondary/80 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('hero')} className="text-white/80 hover:text-secondary transition-colors">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-white/80 hover:text-secondary transition-colors">من نحن</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">منتجاتنا</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="text-white/80 hover:text-secondary transition-colors">مميزاتنا</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('testimonials')} className="text-white/80 hover:text-secondary transition-colors">آراء العملاء</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-secondary transition-colors">الأسئلة المتكررة</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-white/80 hover:text-secondary transition-colors">تواصل معنا</button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">منتجاتنا</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">أكياس تسوق</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">أكياس تغليف</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">أكياس قمامة</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">أكياس مطبوعة</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="text-white/80 hover:text-secondary transition-colors">أكياس بمقاسات خاصة</button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 ml-2 text-secondary mt-1 shrink-0" />
                <span className="text-white">المملكة العربية السعودية، الرياض، المدينة الصناعية الثانية</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 ml-2 text-secondary shrink-0" />
                <span className="text-white dir-ltr">01009923040</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 ml-2 text-secondary shrink-0" />
                <span className="text-white">info@elbarkaplast.com</span>
              </li>
            </ul>
            
            <div className="mt-4 rounded-lg overflow-hidden shadow-md h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4401111516273!2d46.75606387584941!3d24.719785978978414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0336b3cd4021%3A0x819fcf3c87518671!2sIndustrial%20City%202%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1712685247097!5m2!1sen!2ssa" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع البركة بلاست"
              ></iframe>
            </div>
          </div>
        </div>
        
        <div className={cn(
          "border-t border-white/20 mt-12 pt-6",
          "flex flex-col md:flex-row justify-between items-center"
        )}>
          <p className="text-white/80">
            &copy; {currentYear} البركة بلاست. جميع الحقوق محفوظة
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 space-x-reverse">
              <li><a href="#" className="text-white/80 hover:text-secondary text-sm">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-white/80 hover:text-secondary text-sm">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
