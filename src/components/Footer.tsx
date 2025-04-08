
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">الرئيسية</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">من نحن</a></li>
              <li><a href="#products" className="text-white/80 hover:text-white transition-colors">منتجاتنا</a></li>
              <li><a href="#features" className="text-white/80 hover:text-white transition-colors">مميزاتنا</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">تواصل معنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">منتجاتنا</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">أكياس تسوق</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">أكياس تغليف</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">أكياس قمامة</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">أكياس مطبوعة</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">أكياس بمقاسات خاصة</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="ml-2 text-white/80">العنوان:</span>
                <span className="text-white">المملكة العربية السعودية، الرياض، المدينة الصناعية الثانية</span>
              </li>
              <li className="flex items-center">
                <span className="ml-2 text-white/80">الهاتف:</span>
                <span className="text-white dir-ltr">+966 55 123 4567</span>
              </li>
              <li className="flex items-center">
                <span className="ml-2 text-white/80">البريد:</span>
                <span className="text-white">info@barakahplast.com</span>
              </li>
            </ul>
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
              <li><a href="#" className="text-white/80 hover:text-white text-sm">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-white/80 hover:text-white text-sm">الشروط والأحكام</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
