import { Iconify } from "react-native-iconify";

export const url = {
  base_url: "https://bnookholding.com/wd/api/",
  media_url: "https://bnookholding.com/wd/uploads/",
  locationIQ:
    "https://api.locationiq.com/v1/autocomplete?key=pk.6909aa77110cff9b1d7fc9c6ed08f00f&q=",
  geocode_url:
    "https://us1.locationiq.com/v1/reverse?key=pk.6909aa77110cff9b1d7fc9c6ed08f00f&"
};
export const icons = [
  // {
  //   name: "prop_num",
  //   icon: <Iconify icon={"ant-design:number-outlined"} size={20} color={"grey"} />,
  //   nameAR: "رقم العقار"
  // },
  // {
  //   name: "prop_type",
  //   icon: <Iconify icon={"material-symbols:home"} size={20} color={"grey"} />,
  //   nameAR: "نوع العقار"
  // },
  // {
  //   name: "prop_space",
  //   icon: <Iconify icon={"radix-icons:dimensions"} size={20} color={"grey"} />,
  //   nameAR: "مساحة العقار "
  // },
  {
    name: "prop_front",
    icon: <Iconify icon={"material-symbols:home-work-outline"} size={20} color={"grey"} />,
    nameAR: "واجهة العقار "
  }
  ,
  {
    name: "prop_age",
    icon: <Iconify icon={"material-symbols:home-work-outline"} size={20} color={"grey"} />,
    nameAR: "عمر العقار "
  },
  {
    name: "street_width",
    icon: <Iconify icon={"el:road"} size={20} color={"grey"} />,
    nameAR: "عرض الشارع"
  },
  {
    name: "street_count",
    icon: <Iconify icon={"icon-park-solid:map-road"} size={20} color={"grey"} />,
    nameAR: "عدد الشوارع"
  },
  {
    name: "floor_count",
    icon: <Iconify icon={"fluent:building-48-filled"} size={20} color={"grey"} />,
    nameAR: "عدد الطوابق"
  },
  {
    name: "floor_num",
    icon: <Iconify icon={"fluent:building-48-filled"} size={20} color={"grey"} />,
    nameAR: "رقم الطابق "
  },
  {
    name: "duplex",
    icon: <Iconify icon={"mdi:family-room"} size={20} color={"grey"} />,
    nameAR: "دوبلكس"
  },
  {
    name: "room_count",
    icon: <Iconify icon={"material-symbols-light:bedroom-child-outline"} size={20} color={"grey"} />,
    nameAR: "عدد الغرف"
  },
  {
    name: "hall_count",
    icon: <Iconify icon={"fluent:device-meeting-room-16-regular"} size={20} color={"grey"} />,
    nameAR: "عدد الصالات"
  },
  {
    name: "bath_count",
    icon: <Iconify icon={"solar:bath-bold"} size={20} color={"grey"} />,
    nameAR: "عدد الحمامات"
  },
  {
    name: "female_kitchen",
    icon: <Iconify icon={"material-symbols:soup-kitchen"} size={20} color={"grey"} />,
    nameAR: "مطبخ مؤننث"
  },
  {
    name: "two_entrance",
    icon: <Iconify icon={"ph:door-fill"} size={20} color={"grey"} />,
    nameAR: "مدخلين "
  },
  {
    name: "water",
    icon: <Iconify icon={"ion:water-outline"} size={20} color={"grey"} />,
    nameAR: "مياة"
  },
  {
    name: "saintitation",
    icon: <Iconify icon={"game-icons:water-splash"} size={20} color={"grey"} />,
    nameAR: "صرف صحي"
  },
  {
    name: "mobile_network",
    icon: <Iconify icon={"ooui:network"} size={20} color={"grey"} />,
    nameAR: "شبكة هاتف"
  },
  {
    name: "electricity",
    icon: <Iconify icon={"pepicons-pop:electricity"} size={20} color={"grey"} />,
    nameAR: "كهرباء"
  },
  {
    name: "garden",
    icon: <Iconify icon={"material-symbols:home-and-garden"} size={20} color={"grey"} />,
    nameAR: "حديقة"
  },
  {
    name: "basment",
    icon: <Iconify icon={"majesticons:home"} size={20} color={"grey"} />,
    nameAR: "قبو"
  },
  {
    name: "elevator",
    icon: <Iconify icon={"grommet-icons:elevator"} size={20} color={"grey"} />,
    nameAR: "مصعد"
  },
  {
    name: "maid_room",
    icon: <Iconify icon={"mdi:guest-room-outline"} size={20} color={"grey"} />,
    nameAR: "غرفة خادمة"
  },
  {
    name: "garage",
    icon: <Iconify icon={"material-symbols-light:garage"} size={20} color={"grey"} />,
    nameAR: "جراج سيارات"
  },
  {
    name: "air_condition",
    icon: <Iconify icon={"mingcute:air-condition-open-line"} size={20} color={"grey"} />,
    nameAR: "تكييف"
  },
  {
    name: "private_roof",
    icon: <Iconify icon={"material-symbols:roofing-rounded"} size={20} color={"grey"} />,
    nameAR: "سطح خاص"
  },
  {
    name: "swimming_pool",
    icon: <Iconify icon={"uil:swimmer"} size={20} color={"grey"} />,
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
