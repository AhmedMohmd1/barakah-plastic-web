
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardDescription,
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft } from 'lucide-react';
import { ProductCardProps } from './types';

interface ListProductCardProps extends Omit<ProductCardProps, 'viewMode'> {
  onQuoteRequest: (productName: string, productImage: string) => void;
}

const ListProductCard: React.FC<ListProductCardProps> = ({
  product,
  onViewDetails,
  onQuoteRequest,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden border-0 shadow-md transition-all duration-300",
        "hover:shadow-lg hover:translate-y-[-2px]",
        "bg-white hover:bg-white/95"
      )}
      data-name={product.name}
      data-img={product.image}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-52 md:h-auto overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          {product.badge && (
            <Badge 
              className="absolute top-3 right-3 bg-secondary text-white border-0 px-3 py-1 shadow-md"
            >
              {product.badge}
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/30 md:bg-black/0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 hover:scale-110 transition-all"
              onClick={() => onViewDetails(product.id)}
            >
              <Eye className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col p-6">
          <CardTitle className="font-bold text-xl mb-3 text-primary relative">
            {product.name}
            {product.badge && (
              <Badge 
                className="mr-2 bg-secondary text-white border-0 px-2 py-[2px] hidden md:inline-flex"
              >
                {product.badge}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4 flex-grow">
            {product.description}
          </CardDescription>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button 
              variant="outline" 
              className={cn(
                "flex-1 border-secondary text-secondary transition-all duration-300",
                "hover:bg-secondary hover:text-white group"
              )}
              onClick={() => onViewDetails(product.id)}
            >
              المزيد من التفاصيل
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
            </Button>
            <Button 
              className="flex-1"
              onClick={() => onQuoteRequest(product.name, product.image)}
            >
              طلب عرض سعر
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ListProductCard;
