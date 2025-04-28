
export interface ProductOption {
  value: string;
  label: string;
  description?: string;
}

export const productOptions: ProductOption[] = [
  {
    value: "shopping-bags",
    label: "أكياس تسوق",
    description: "أكياس تسوق متينة بمقاسات مختلفة"
  },
  {
    value: "packaging-bags",
    label: "أكياس تغليف",
    description: "أكياس تغليف شفافة وملونة"
  },
  {
    value: "printed-bags",
    label: "أكياس مطبوعة",
    description: "أكياس مطبوعة بشعار الشركة"
  },
  {
    value: "canvas-bags",
    label: "شنط قماش",
    description: "شنط قماش صديقة للبيئة"
  },
  {
    value: "cellophane-bags",
    label: "اكياس سلوفان",
    description: "أكياس سلوفان شفافة مع شريط"
  }
];
