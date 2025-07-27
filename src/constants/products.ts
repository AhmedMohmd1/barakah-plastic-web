
export const PRODUCTS = [
  {
    id: 1,
    name: "شُنط مطبوعة بشعارك",
    description:
      "أكياس شراء مخصصة عالية الجودة مع طباعة احترافية لشعار شركتك. مصنوعة من مواد متينة ، مثالية لتعزيز هوية علامتك التجارية وتقديم تجربة تسوق مميزة لعملائك.",
    image: "/images/plasticbag.jpeg",
    images: [
      "/images/plasticbag.jpeg",
      "/images/plasticbag2.png",
    ],
    specifications: [
      { name: "المادة", value: "بلاستيك عالي الجودة" },
      { name: "السُمك", value: "حسب الطلب – متوفر بسماكات مختلفة حسب الاستخدام" },
      { name: "الحجم", value: "أحجام متعددة - حسب الطلب" },
      { name: "الطباعة", value: "طباعة ديجيتال أو فلكسو بدقة عالية (وجه واحد أو وجهين)" }
    ],
    // rating: 4.8,
    // reviewCount: "24 تقييم"
  },
  {
    id: 2,
    name: "شنط سوفت للمحلات الملابس",
    description:
      "شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية، مثالية لتعزيز تجربة التسوق",
    image: "/images/softbagsCover.png",
    images: [
      "/images/softbagsCover.png",
      "/images/softBags.jpg",
      "/images/softbag2.png",
      "/images/softBag1.png",
    ],
    specifications: [
      // { name: "المادة", value: "قماش ناعم" },
      { name: "المقاسات", value: "صغير، متوسط، كبير" },
      { name: "الألوان", value: "ألوان متنوعة" },
      { name: "التصميم", value: "أنيق وعملي" }
    ],
    // rating: 4.6,
    //    reviewCount: "18 تقييم"
  },
  {
    id: 3,
    name: "شنط قماش",
    description:
      "شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية، مثالية للتسوق وحمل المشتريات اليومية",
    image: "/images/canvas.jpeg",
    images: [
      "/images/canvas.jpeg",
      "/images/canvas2.png",

    ],
    specifications: [
      //  { name: "المادة", value: "قماش قطني 100%" },
      { name: "السعة", value: "10-15 كيلو" },
      { name: "صديق للبيئة", value: "قابل للغسيل والإعادة الاستخدام" },
      { name: "المقاسات", value: "متوسط وكبير" }
    ],
    // rating: 4.9,
    // reviewCount: "32 تقييم"
  },
  {
    id: 4,
    name: "اكياس سلوفان بشريطه",
    description:
      "أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم، مثالية لتغليف المنتجات الصغيرة والهدايا بشكل أنيق",
    image: "/images/كيس سلوفان.jpeg",
    images: [
      "/images/كيس سلوفان.jpeg",
      "/images/solfan2.jpeg",

    ],
    specifications: [
      { name: "المادة", value: "سلوفان شفاف" },
      { name: "الإغلاق", value: "شريط لاصق قوي" },
      { name: "الاستخدام", value: "تغليف وحفظ المنتجات " },
      { name: "الشفافية", value: "عالية الوضوح" }
    ],
    // rating: 4.7,
    // reviewCount: "15 تقييم"
  },
  {
    id: 5,
    name: "اكياس ذات غالق - ziplock bags",
    description:
      "أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات، متوفرة بأحجام مختلفة",
    image: "/images/اكياس-بقفل.png",
    images: [
      "/images/اكياس-بقفل.png",
      "/images/ziplockBag.jpg",
      "/images/ziplockBag1.jpg",

    ],
    specifications: [
      { name: "النوع", value: "أكياس بسحاب" },
      { name: "الاستخدام", value: "حفظ الطعام والمنتجات" },
      { name: "الأحجام", value: "صغير، متوسط، كبير" },
      { name: "القابلية", value: "قابل للإغلاق المحكم" }
    ],
    // rating: 4.5,
    // reviewCount: "21 تقييم"
  },
];

export type ProductType = typeof PRODUCTS[number];
