export const url = {
  base_url: "https://bnookholding.com/wd/api/",
  media_url: "https://bnookholding.com/wd/uploads/",
  locationIQ:
    "https://api.locationiq.com/v1/autocomplete?key=pk.6909aa77110cff9b1d7fc9c6ed08f00f&q=",
  geocode_url:
    "https://us1.locationiq.com/v1/reverse?key=pk.6909aa77110cff9b1d7fc9c6ed08f00f&"
};
export const icons = [
  {
    name: "prop_num",
    icon: "ant-design:number-outlined",
    nameAR: "رقم العقار"
  },
  {
    name: "prop_type",
    icon: "material-symbols:home",
    nameAR: "نوع العقار"
  },
  {
    name: "prop_coords",
    icon: "fluent:location-24-filled",
    nameAR: "إحداثيات العقار "
  },
  {
    name: "prop_price",
    icon: "solar:tag-price-bold",
    nameAR: "سعر العقار"
  },
  {
    name: "prop_space",
    icon: "radix-icons:dimensions",
    nameAR: "مساحة العقار "
  },
  {
    name: "prop_front",
    icon: "material-symbols:home-work-outline",
    nameAR: "واجهة العقار "
  },
  {
    name: "prop_age",
    icon: "material-symbols:home-work-outline",
    nameAR: "عمر العقار "
  },
  {
    name: "street_width",
    icon: "el:road",
    nameAR: "عرض الشارع"
  },
  {
    name: "street_count",
    icon: "icon-park-solid:map-road",
    nameAR: "عدد الشوارع"
  },
  {
    name: "floor_count",
    icon: "fluent:building-48-filled",
    nameAR: "عدد الطوابق"
  },
  {
    name: "floor_num",
    icon: "fluent:building-48-filled",
    nameAR: "رقم الطابق "
  },
  {
    name: "duplex",
    icon: "mdi:family-room",
    nameAR: "دوبلكس"
  },
  {
    name: "room_count",
    icon: "material-symbols-light:bedroom-child-outline",
    nameAR: "عدد الغرف"
  },
  {
    name: "hall_count",
    icon: "fluent:device-meeting-room-16-regular",
    nameAR: "عدد الصالات"
  },
  {
    name: "bath_count",
    icon: "solar:bath-bold",
    nameAR: "عدد الحمامات"
  },
  {
    name: "female_kitchen",
    icon: "material-symbols:soup-kitchen",
    nameAR: "مطبخ مؤننث"
  },
  {
    name: "two_entrance",
    icon: "ph:door-fill",
    nameAR: "مدخلين "
  },
  {
    name: "water",
    icon: "ion:water-outline",
    nameAR: "مياة"
  },
  {
    name: "saintitation",
    icon: "game-icons:water-splash",
    nameAR: "صرف صحي"
  },
  {
    name: "mobile_network",
    icon: "ooui:network",
    nameAR: "شبكة هاتف"
  },
  {
    name: "electricity",
    icon: "pepicons-pop:electricity",
    nameAR: "كهرباء"
  },
  {
    name: "garden",
    icon: "material-symbols:home-and-garden",
    nameAR: "حديقة"
  },
  {
    name: "basment",
    icon: "majesticons:home",
    nameAR: "قبو"
  },
  {
    name: "elevator",
    icon: "grommet-icons:elevator",
    nameAR: "مصعد"
  },
  {
    name: "maid_room",
    icon: "mdi:guest-room-outline",
    nameAR: "غرفة خادمة"
  },
  {
    name: "garage",
    icon: "material-symbols-light:garage",
    nameAR: "جراج سيارات"
  },
  {
    name: "air_condition",
    icon: "mingcute:air-condition-open-line",
    nameAR: "تكييف"
  },
  {
    name: "private_roof",
    icon: "material-symbols:roofing-rounded",
    nameAR: "سطح خاص"
  },
  {
    name: "swimming_pool",
    icon: "uil:swimmer",
    nameAR: "حمام سباحة"
  }
];

export const adv_type = [
  {
    title: "للبيع",
    slug: "buy"
  },
  {
    title: "للإيجار",
    slug: "rent"
  },
  {
    title: "للإستثمار",
    slug: "invest"
  }
];


export const client_type = [
  {
    title: "مالك",
    slug: "owner"
  },
  {
    title: "مستأجر",
    slug: "renter"
  },
  {
    title: "مستثمر",
    slug: "investor"
  },
  {
    title: "مشتري",
    slug: "buyer"
  }
];


export const prop_type = [
  {
    id: "3",
    title: "شقة"
  },
  {
    id: "4",
    title: "فيلا"
  },
  {
    id: "5",
    title: "أرض"
  },
  {
    id: "6",
    title: "عمارة"
  },
  {
    id: "7",
    title: "محل تجاري"
  },
  {
    id: "8",
    title: "مول"
  },
  {
    id: "9",
    title: "شاليه"
  },

  {
    id: "10",
    title: "إستراحة"
  },

  {
    id: "11",
    title: "مستودع"
  },

  {
    id: "12",
    title: "مصنع"
  }
];
export default { url, adv_type, prop_type };
