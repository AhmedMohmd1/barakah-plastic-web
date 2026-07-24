
/** Neutral image shown if a product photo fails to load — never leave a broken tile. */
export const PRODUCT_IMAGE_FALLBACK = "/images/hero.webp";

export const PRODUCTS = [
  {
    id: 1,
    name: "شُنط مطبوعة بشعارك",
    description:
      "أكياس شراء مخصصة عالية الجودة مع طباعة احترافية لشعار شركتك. مصنوعة من مواد متينة ، مثالية لتعزيز هوية علامتك التجارية وتقديم تجربة تسوق مميزة لعملائك.",
    image: "/images/plasticbag.webp",
    images: [
      "/images/plasticbag.webp",
      "/images/plasticbag2.webp",
    ],
    specifications: [
      { name: "المادة", value: "بلاستيك عالي الجودة" },
      { name: "السُمك", value: "حسب الطلب – متوفر بسماكات مختلفة حسب الاستخدام" },
      { name: "الحجم", value: "أحجام متعددة - حسب الطلب" },
      { name: "الطباعة", value: "طباعة ديجيتال أو فلكسو بدقة عالية (وجه واحد أو وجهين)" },
      { name: "الاستخدام المقترح", value: "متاجر وعلامات تجارية تريد طباعة شعارها الخاص" }
    ],
    // rating: 4.8,
    // reviewCount: "24 تقييم"
  },
  {
    id: 2,
    name: "شنط سوفت للمحلات الملابس",
    description:
      "شنط ناعمة خاصة لمحلات الملابس بتصاميم أنيقة وراقية، مثالية لتعزيز تجربة التسوق",
    image: "/images/softbagsCover.webp",
    images: [
      "/images/softbagsCover.webp",
      "/images/softbag2.webp",
      "/images/softBag1.webp",
    ],
    specifications: [
      { name: "المادة", value: "قماش ناعم" },
      { name: "المقاسات", value: "صغير، متوسط، كبير" },
      { name: "الألوان", value: "ألوان متنوعة" },
      { name: "التصميم", value: "أنيق وعملي" },
      { name: "الاستخدام المقترح", value: "محلات الملابس والأزياء" }
    ],
    // rating: 4.6,
    //    reviewCount: "18 تقييم"
  },
  {
    id: 3,
    name: "شنط قماش",
    description:
      "شنط قماش صديقة للبيئة متعددة الاستخدامات بتصاميم عصرية، مثالية للتسوق وحمل المشتريات اليومية",
    image: "/images/canvas.webp",
    images: [
      "/images/canvas.webp",
      "/images/canvas2.webp",

    ],
    specifications: [
      { name: "المادة", value: "قماش قطني 100%" },
      { name: "السعة", value: "10-15 كيلو" },
      { name: "صديق للبيئة", value: "قابل للغسيل والإعادة الاستخدام" },
      { name: "المقاسات", value: "متوسط وكبير" },
      { name: "الاستخدام المقترح", value: "التسوق اليومي وحمل المشتريات" }
    ],
    // rating: 4.9,
    // reviewCount: "32 تقييم"
  },
  {
    id: 4,
    name: "اكياس سلوفان بشريطه",
    description:
      "أكياس سلوفان شفافة مع شريط لاصق للإغلاق المحكم، مثالية لتغليف المنتجات الصغيرة والهدايا بشكل أنيق",
    image: "/images/solfan1.webp",
    images: [
      "/images/solfan1.webp",
      "/images/solfan2.webp",

    ],
    specifications: [
      { name: "المادة", value: "سلوفان شفاف" },
      { name: "الإغلاق", value: "شريط لاصق قوي" },
      { name: "الاستخدام", value: "تغليف وحفظ المنتجات " },
      { name: "الشفافية", value: "عالية الوضوح" },
      { name: "الاستخدام المقترح", value: "تغليف المنتجات الصغيرة والهدايا" }
    ],
    // rating: 4.7,
    // reviewCount: "15 تقييم"
  },
  {
    id: 5,
    name: "اكياس ذات غالق - ziplock bags",
    description:
      "أكياس بسحاب قابلة للإغلاق والفتح، مناسبة لحفظ الطعام والمنتجات، متوفرة بأحجام مختلفة",
    image: "/images/ziplock-bag-2.webp",
    images: [
      "/images/ziplock-bag-2.webp",
      "/images/ziplockBag.webp",
      "/images/ziplockBag1.webp",

    ],
    specifications: [
      { name: "النوع", value: "أكياس بسحاب" },
      { name: "الاستخدام", value: "حفظ الطعام والمنتجات" },
      { name: "الأحجام", value: "صغير، متوسط، كبير" },
      { name: "القابلية", value: "قابل للإغلاق المحكم" },
      { name: "الاستخدام المقترح", value: "حفظ الطعام والمنتجات في المنزل أو المتجر" }
    ],
    // rating: 4.5,
    // reviewCount: "21 تقييم"
  },
];

export type ProductType = typeof PRODUCTS[number];
