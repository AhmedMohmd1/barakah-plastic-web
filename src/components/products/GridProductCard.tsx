import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft } from 'lucide-react';
import { ProductCardProps } from './types';

interface GridProductCardProps extends Omit<ProductCardProps, 'viewMode'> {
  onQuoteRequest: (productName: string, productImage: string) => void;
}

const GridProductCard: React.FC<GridProductCardProps> = ({
  product,
  hoveredProduct,
  onHover,
  onViewDetails,
  onQuoteRequest,
}) => {
  return (
    <Card 
      className={cn(
        "group overflow-hidden border-0 shadow-md transition-all duration-300",
        "hover:shadow-lg hover:translate-y-[-5px]",
        "bg-white hover:bg-white/95"
      )}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
      data-name={product.name}
      data-img={product.image}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className={cn(
            "w-full h-full object-cover object-center transition-transform duration-500",
            "group-hover:scale-105 group-hover:brightness-105"
          )}
        />
        {product.badge && (
          <Badge 
            className="absolute top-3 right-3 bg-secondary text-white border-0 px-3 py-1 shadow-md animate-fade-in"
          >
            {product.badge}
          </Badge>
        )}
        <div className={cn(
          "absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300",
          hoveredProduct === product.id ? "opacity-100" : "opacity-0"
        )}>
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
      <CardHeader className="p-4 pb-0">
        <CardTitle className="font-bold text-xl text-primary">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardDescription className="text-gray-600 h-16 overflow-hidden">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button 
          variant="outline" 
          className={cn(
            "w-full border-secondary text-secondary transition-all duration-300",
            "hover:bg-secondary hover:text-white",
            "group-hover:bg-secondary/10"
          )}
          onClick={() => onViewDetails(product.id)}
        >
          المزيد من التفاصيل
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:transform group-hover:translate-x-[-3px] transition-transform" />
        </Button>
        <Button 
          className="w-full"
          onClick={() => onQuoteRequest(product.name, product.image)}
        >
          طلب عرض سعر
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GridProductCard;
