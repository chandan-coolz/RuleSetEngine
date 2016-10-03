class DynamicCampaignConfig {


constructor(){



this.assetSourceServiceList = {
  "geo": {
    "name": "Geography",
    "city": {
      "name": "City",
      "type": "comboajax",
      "operations": [
        "equals",
        "in"
      ],
      "values_url": "rulePropValues.php"
    },
    "state": {
      "name": "State",
      "type": "comboajax",
      "operations": [
        "equals",
        "in"
      ],
      "values_url": "rulePropValues.php"
    },
    "postalCode": {
      "name": "Postal Code",
      "type": "comboajax",
      "operations": [
        "equals",
        "in"
      ],
      "values_url": "rulePropValues.php"
    },
    "dma": {
      "name": "DMA",
      "type": "comboajax",
      "operations": [
        "equals",
        "in"
      ],
      "values_url": "rulePropValues.php"
    },
    "country": {
      "name": "Country",
      "type": "combo",
      "operations": [
        "equals",
        "in"
      ],
      "values": {
        "united states": "United States",
        "india": "India",
        "united kingdom": "United Kingdom",
        "france": "France",
        "germany": "Germany",
        "netherlands": "Netherlands",
        "poland": "Poland",
        "russian federation": "Russia",
        "japan": "Japan",
        "singapore": "Singapore",
        "malaysia": "Malaysia",
        "australia": "Australia",
        "thailand": "Thailand",
        "indonesia": "Indonesia",
        "new zealand": "New Zealand",
        "andorra": "Andorra",
        "united arab emirates": "United Arab Emirates",
        "afghanistan": "Afghanistan",
        "antigua and barbuda": "Antigua and Barbuda",
        "anguilla": "Anguilla",
        "albania": "Albania",
        "armenia": "Armenia",
        "netherlands antilles": "Netherlands Antilles",
        "angola": "Angola",
        "asia/pacific region": "Asia/Pacific Region",
        "antarctica": "Antarctica",
        "argentina": "Argentina",
        "american samoa": "American Samoa",
        "austria": "Austria",
        "aruba": "Aruba",
        "aland islands": "Aland Islands",
        "azerbaijan": "Azerbaijan",
        "bosnia and herzegovina": "Bosnia and Herzegovina",
        "barbados": "Barbados",
        "bangladesh": "Bangladesh",
        "belgium": "Belgium",
        "burkina faso": "Burkina Faso",
        "bulgaria": "Bulgaria",
        "bahrain": "Bahrain",
        "burundi": "Burundi",
        "benin": "Benin",
        "bermuda": "Bermuda",
        "brunei darussalam": "Brunei Darussalam",
        "bolivia": "Bolivia",
        "brazil": "Brazil",
        "bahamas": "Bahamas",
        "bhutan": "Bhutan",
        "bouvet island": "Bouvet Island",
        "botswana": "Botswana",
        "belarus": "Belarus",
        "belize": "Belize",
        "canada": "Canada",
        "cocos (keeling) islands": "Cocos (Keeling) Islands",
        "congo, the democratic republic of the": "Congo, The Democratic Republic of the",
        "central african republic": "Central African Republic",
        "congo": "Congo",
        "switzerland": "Switzerland",
        "cote d'ivoire": "Cote d'Ivoire",
        "cook islands": "Cook Islands",
        "chile": "Chile",
        "cameroon": "Cameroon",
        "china": "China",
        "colombia": "Colombia",
        "costa rica": "Costa Rica",
        "cuba": "Cuba",
        "cape verde": "Cape Verde",
        "christmas island": "Christmas Island",
        "cyprus": "Cyprus",
        "czech republic": "Czech Republic",
        "djibouti": "Djibouti",
        "denmark": "Denmark",
        "dominica": "Dominica",
        "dominican republic": "Dominican Republic",
        "algeria": "Algeria",
        "ecuador": "Ecuador",
        "estonia": "Estonia",
        "egypt": "Egypt",
        "western sahara": "Western Sahara",
        "eritrea": "Eritrea",
        "spain": "Spain",
        "ethiopia": "Ethiopia",
        "europe": "Europe",
        "finland": "Finland",
        "fiji": "Fiji",
        "falkland islands (malvinas)": "Falkland Islands (Malvinas)",
        "micronesia, federated states of": "Micronesia, Federated States of",
        "faroe islands": "Faroe Islands",
        "gabon": "Gabon",
        "grenada": "Grenada",
        "georgia": "Georgia",
        "french guiana": "French Guiana",
        "guernsey": "Guernsey",
        "ghana": "Ghana",
        "gibraltar": "Gibraltar",
        "greenland": "Greenland",
        "gambia": "Gambia",
        "guinea": "Guinea",
        "guadeloupe": "Guadeloupe",
        "equatorial guinea": "Equatorial Guinea",
        "greece": "Greece",
        "south georgia and the south sandwich islands": "South Georgia and the South Sandwich Islands",
        "guatemala": "Guatemala",
        "guam": "Guam",
        "guinea-bissau": "Guinea-Bissau",
        "guyana": "Guyana",
        "hong kong": "Hong Kong",
        "heard island and mcdonald islands": "Heard Island and McDonald Islands",
        "honduras": "Honduras",
        "croatia": "Croatia",
        "haiti": "Haiti",
        "hungary": "Hungary",
        "ireland": "Ireland",
        "israel": "Israel",
        "isle of man": "Isle of Man",
        "british indian ocean territory": "British Indian Ocean Territory",
        "iraq": "Iraq",
        "iran, islamic republic of": "Iran, Islamic Republic of",
        "iceland": "Iceland",
        "italy": "Italy",
        "jersey": "Jersey",
        "jamaica": "Jamaica",
        "jordan": "Jordan",
        "kenya": "Kenya",
        "kyrgyzstan": "Kyrgyzstan",
        "cambodia": "Cambodia",
        "kiribati": "Kiribati",
        "comoros": "Comoros",
        "saint kitts and nevis": "Saint Kitts and Nevis",
        "korea, democratic people's republic of": "Korea, Democratic People's Republic of",
        "republic of korea": "Republic of Korea",
        "kuwait": "Kuwait",
        "cayman islands": "Cayman Islands",
        "kazakhstan": "Kazakhstan",
        "lao people's democratic republic": "Lao People's Democratic Republic",
        "lebanon": "Lebanon",
        "saint lucia": "Saint Lucia",
        "liechtenstein": "Liechtenstein",
        "sri lanka": "Sri Lanka",
        "liberia": "Liberia",
        "lesotho": "Lesotho",
        "lithuania": "Lithuania",
        "luxembourg": "Luxembourg",
        "latvia": "Latvia",
        "libyan arab jamahiriya": "Libyan Arab Jamahiriya",
        "morocco": "Morocco",
        "monaco": "Monaco",
        "moldova, republic of": "Moldova, Republic of",
        "montenegro": "Montenegro",
        "madagascar": "Madagascar",
        "marshall islands": "Marshall Islands",
        "macedonia": "Macedonia",
        "mali": "Mali",
        "myanmar": "Myanmar",
        "mongolia": "Mongolia",
        "macao": "Macao",
        "northern mariana islands": "Northern Mariana Islands",
        "martinique": "Martinique",
        "mauritania": "Mauritania",
        "montserrat": "Montserrat",
        "malta": "Malta",
        "mauritius": "Mauritius",
        "maldives": "Maldives",
        "malawi": "Malawi",
        "mexico": "Mexico",
        "mozambique": "Mozambique",
        "namibia": "Namibia",
        "new caledonia": "New Caledonia",
        "niger": "Niger",
        "norfolk island": "Norfolk Island",
        "nigeria": "Nigeria",
        "nicaragua": "Nicaragua",
        "norway": "Norway",
        "nepal": "Nepal",
        "nauru": "Nauru",
        "niue": "Niue",
        "oman": "Oman",
        "panama": "Panama",
        "peru": "Peru",
        "french polynesia": "French Polynesia",
        "papua new guinea": "Papua New Guinea",
        "philippines": "Philippines",
        "pakistan": "Pakistan",
        "saint pierre and miquelon": "Saint Pierre and Miquelon",
        "pitcairn": "Pitcairn",
        "puerto rico": "Puerto Rico",
        "palestinian territory": "Palestinian Territory",
        "portugal": "Portugal",
        "palau": "Palau",
        "paraguay": "Paraguay",
        "qatar": "Qatar",
        "reunion": "Reunion",
        "romania": "Romania",
        "serbia": "Serbia",
        "rwanda": "Rwanda",
        "saudi arabia": "Saudi Arabia",
        "solomon islands": "Solomon Islands",
        "seychelles": "Seychelles",
        "sudan": "Sudan",
        "sweden": "Sweden",
        "saint helena": "Saint Helena",
        "slovenia": "Slovenia",
        "svalbard and jan mayen": "Svalbard and Jan Mayen",
        "slovakia": "Slovakia",
        "sierra leone": "Sierra Leone",
        "san marino": "San Marino",
        "senegal": "Senegal",
        "somalia": "Somalia",
        "suriname": "Suriname",
        "sao tome and principe": "Sao Tome and Principe",
        "el salvador": "El Salvador",
        "syrian arab republic": "Syrian Arab Republic",
        "swaziland": "Swaziland",
        "turks and caicos islands": "Turks and Caicos Islands",
        "chad": "Chad",
        "french southern territories": "French Southern Territories",
        "togo": "Togo",
        "tajikistan": "Tajikistan",
        "tokelau": "Tokelau",
        "timor-leste": "Timor-Leste",
        "turkmenistan": "Turkmenistan",
        "tunisia": "Tunisia",
        "tonga": "Tonga",
        "turkey": "Turkey",
        "trinidad and tobago": "Trinidad and Tobago",
        "tuvalu": "Tuvalu",
        "taiwan": "Taiwan",
        "tanzania, united republic of": "Tanzania, United Republic of",
        "ukraine": "Ukraine",
        "uganda": "Uganda",
        "united states minor outlying islands": "United States Minor Outlying Islands",
        "uruguay": "Uruguay",
        "uzbekistan": "Uzbekistan",
        "holy see (vatican city state)": "Holy See (Vatican City State)",
        "saint vincent and the grenadines": "Saint Vincent and the Grenadines",
        "venezuela": "Venezuela",
        "virgin islands, british": "Virgin Islands, British",
        "virgin islands, u.s.": "Virgin Islands, U.S.",
        "vietnam": "Vietnam",
        "vanuatu": "Vanuatu",
        "wallis and futuna": "Wallis and Futuna",
        "samoa": "Samoa",
        "yemen": "Yemen",
        "mayotte": "Mayotte",
        "south africa": "South Africa",
        "zambia": "Zambia",
        "zimbabwe": "Zimbabwe"
      }
    },
    "countryCode": {
      "name": "Country Code",
      "type": "combo",
      "operations": [
        "equals",
        "in"
      ],
      "values": {
        "ad": "AD",
        "ae": "AE",
        "af": "AF",
        "ag": "AG",
        "ai": "AI",
        "al": "AL",
        "am": "AM",
        "an": "AN",
        "ao": "AO",
        "ap": "AP",
        "aq": "AQ",
        "ar": "AR",
        "as": "AS",
        "at": "AT",
        "au": "AU",
        "aw": "AW",
        "ax": "AX",
        "az": "AZ",
        "ba": "BA",
        "bb": "BB",
        "bd": "BD",
        "be": "BE",
        "bf": "BF",
        "bg": "BG",
        "bh": "BH",
        "bi": "BI",
        "bj": "BJ",
        "bm": "BM",
        "bn": "BN",
        "bo": "BO",
        "br": "BR",
        "bs": "BS",
        "bt": "BT",
        "bv": "BV",
        "bw": "BW",
        "by": "BY",
        "bz": "BZ",
        "ca": "CA",
        "cc": "CC",
        "cd": "CD",
        "cf": "CF",
        "cg": "CG",
        "ch": "CH",
        "ci": "CI",
        "ck": "CK",
        "cl": "CL",
        "cm": "CM",
        "cn": "CN",
        "co": "CO",
        "cr": "CR",
        "cu": "CU",
        "cv": "CV",
        "cx": "CX",
        "cy": "CY",
        "cz": "CZ",
        "de": "DE",
        "dj": "DJ",
        "dk": "DK",
        "dm": "DM",
        "do": "DO",
        "dz": "DZ",
        "ec": "EC",
        "ee": "EE",
        "eg": "EG",
        "eh": "EH",
        "er": "ER",
        "es": "ES",
        "et": "ET",
        "eu": "EU",
        "fi": "FI",
        "fj": "FJ",
        "fk": "FK",
        "fm": "FM",
        "fo": "FO",
        "fr": "FR",
        "ga": "GA",
        "gb": "GB",
        "gd": "GD",
        "ge": "GE",
        "gf": "GF",
        "gg": "GG",
        "gh": "GH",
        "gi": "GI",
        "gl": "GL",
        "gm": "GM",
        "gn": "GN",
        "gp": "GP",
        "gq": "GQ",
        "gr": "GR",
        "gs": "GS",
        "gt": "GT",
        "gu": "GU",
        "gw": "GW",
        "gy": "GY",
        "hk": "HK",
        "hm": "HM",
        "hn": "HN",
        "hr": "HR",
        "ht": "HT",
        "hu": "HU",
        "id": "ID",
        "ie": "IE",
        "il": "IL",
        "im": "IM",
        "in": "IN",
        "io": "IO",
        "iq": "IQ",
        "ir": "IR",
        "is": "IS",
        "it": "IT",
        "je": "JE",
        "jm": "JM",
        "jo": "JO",
        "jp": "JP",
        "ke": "KE",
        "kg": "KG",
        "kh": "KH",
        "ki": "KI",
        "km": "KM",
        "kn": "KN",
        "kp": "KP",
        "kr": "KR",
        "kw": "KW",
        "ky": "KY",
        "kz": "KZ",
        "la": "LA",
        "lb": "LB",
        "lc": "LC",
        "li": "LI",
        "lk": "LK",
        "lr": "LR",
        "ls": "LS",
        "lt": "LT",
        "lu": "LU",
        "lv": "LV",
        "ly": "LY",
        "ma": "MA",
        "mc": "MC",
        "md": "MD",
        "me": "ME",
        "mg": "MG",
        "mh": "MH",
        "mk": "MK",
        "ml": "ML",
        "mm": "MM",
        "mn": "MN",
        "mo": "MO",
        "mp": "MP",
        "mq": "MQ",
        "mr": "MR",
        "ms": "MS",
        "mt": "MT",
        "mu": "MU",
        "mv": "MV",
        "mw": "MW",
        "mx": "MX",
        "my": "MY",
        "mz": "MZ",
        "na": "NA",
        "nc": "NC",
        "ne": "NE",
        "nf": "NF",
        "ng": "NG",
        "ni": "NI",
        "nl": "NL",
        "no": "NO",
        "np": "NP",
        "nr": "NR",
        "nu": "NU",
        "nz": "NZ",
        "om": "OM",
        "pa": "PA",
        "pe": "PE",
        "pf": "PF",
        "pg": "PG",
        "ph": "PH",
        "pk": "PK",
        "pl": "PL",
        "pm": "PM",
        "pn": "PN",
        "pr": "PR",
        "ps": "PS",
        "pt": "PT",
        "pw": "PW",
        "py": "PY",
        "qa": "QA",
        "re": "RE",
        "ro": "RO",
        "rs": "RS",
        "ru": "RU",
        "rw": "RW",
        "sa": "SA",
        "sb": "SB",
        "sc": "SC",
        "sd": "SD",
        "se": "SE",
        "sg": "SG",
        "sh": "SH",
        "si": "SI",
        "sj": "SJ",
        "sk": "SK",
        "sl": "SL",
        "sm": "SM",
        "sn": "SN",
        "so": "SO",
        "sr": "SR",
        "st": "ST",
        "sv": "SV",
        "sy": "SY",
        "sz": "SZ",
        "tc": "TC",
        "td": "TD",
        "tf": "TF",
        "tg": "TG",
        "th": "TH",
        "tj": "TJ",
        "tk": "TK",
        "tl": "TL",
        "tm": "TM",
        "tn": "TN",
        "to": "TO",
        "tr": "TR",
        "tt": "TT",
        "tv": "TV",
        "tw": "TW",
        "tz": "TZ",
        "ua": "UA",
        "ug": "UG",
        "um": "UM",
        "us": "US",
        "uy": "UY",
        "uz": "UZ",
        "va": "VA",
        "vc": "VC",
        "ve": "VE",
        "vg": "VG",
        "vi": "VI",
        "vn": "VN",
        "vu": "VU",
        "wf": "WF",
        "ws": "WS",
        "ye": "YE",
        "yt": "YT",
        "za": "ZA",
        "zm": "ZM",
        "zw": "ZW"
      }
    }
  },
  "weather": {
    "name": "Weather",
    "temp": {
      "name": "Temperature",
      "type": "text",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "wind": {
      "name": "Wind",
      "type": "text",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "weather": {
      "name": "Weather",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "cloudy": "Cloudy",
        "sunny": "Sunny",
        "fog": "Fog",
        "freezing": "Freezing",
        "ice": "Ice",
        "rain": "Rain",
        "snow": "Snow",
        "stormy": "Stormy",
        "windy": "Windy",
        "cold": "Cold",
        "hot": "Hot"
      }
    }
  },
  "time": {
    "name": "Time",
    "local-date": {
      "name": "Local Date",
      "type": "date",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "local-time": {
      "name": "Local Time",
      "type": "time",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "local-date-time": {
      "name": "Local Date and Time",
      "type": "datetime",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "local-day-of-week": {
      "name": "Local Day of Week",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "sunday": "Sunday",
        "monday": "Monday",
        "tuesday": "Tuesday",
        "wednesday": "Wednesday",
        "thursday": "Thursday",
        "friday": "Friday",
        "saturday": "Saturday"
      }
    },
    "date": {
      "name": "Date",
      "type": "date",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "date-time": {
      "name": "Date and Time",
      "type": "datetime",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ]
    },
    "day-of-week": {
      "name": "Day of Week",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "sunday": "Sunday",
        "monday": "Monday",
        "tuesday": "Tuesday",
        "wednesday": "Wednesday",
        "thursday": "Thursday",
        "friday": "Friday",
        "saturday": "Saturday"
      }
    }
  },
  "device": {
    "name": "Device",
    "model": {
      "name": "Model",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "iPhone": "iPhone",
        "iPad": "iPad",
        "Android Mobile": "Android",
        "Mac": "Mac",
        "PC": "PC"
      }
    },
    "browserType": {
      "name": "Browser Type",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "Chrome": "Chrome",
        "Firefox": "Firefox",
        "Safari": "Safari",
        "IE": "Internet Explorer"
      }
    },
    "osType": {
      "name": "Operating System",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "Windows": "Windows",
        "Mac OS": "Mac OS",
        "iOS": "iOS",
        "Android": "Android",
        "Windows Phone": "Windows Phone",
        "Linux": "Linux"
      }
    }
  },
  "holidays": {
    "name": "Holidays",
    "holidayName": {
      "name": "Holiday Name",
      "type": "text",
      "operations": [
        "equals"
      ]
    },
    "isHappening": {
      "name": "Is Happening",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "true": "True",
        "false": "False"
      }
    }
  },
  "bluekai": {
    "name": "BlueKai",
    "segmentId": {
      "name": "Category ID",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    }
  },
  "liveramp": {
    "name": "Liveramp",
    "segmentId": {
      "name": "Segment ID",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    }
  },
  "krux": {
    "name": "Krux",
    "segmentId": {
      "name": "Segment ID",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    }
  },
  "tagVarService": {
    "name": "Tag Variable",
    "DataSignal1": {
      "name": "Data Signal 1",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal2": {
      "name": "Data Signal 2",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal3": {
      "name": "Data Signal 3",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal4": {
      "name": "Data Signal 4",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal5": {
      "name": "Data Signal 5",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal6": {
      "name": "Data Signal 6",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal7": {
      "name": "Data Signal 7",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal8": {
      "name": "Data Signal 8",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal9": {
      "name": "Data Signal 9",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    },
    "DataSignal10": {
      "name": "Data Signal 10",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ]
    }
  },
  "cookieData": {
    "name": "Cookie Data",
    "jvxdynsq-isSet": {
      "name": "Is creative viewed",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "true": "True",
        "false": "False"
      },
      "optGroup": "Sequential Messaging"
    },
    "jvxdynsq": {
      "name": "Last viewed creative",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Sequential Messaging"
    },
    "jvxdynsq_frequency": {
      "name": "Creative view count",
      "type": "text",
      "operations": [
        "equals",
        "greater-than",
        "less-than"
      ],
      "optGroup": "Sequential Messaging"
    },
    "jvxdynsl-isSet": {
      "name": "Retargeting Cookie Present",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "true": "True",
        "false": "False"
      },
      "optGroup": "Retargeting"
    },
    "jvxdynsl": {
      "name": "Retargeting Cookie",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl-isSet_groups": {
      "name": "Retargeting group present",
      "type": "combo",
      "operations": [
        "equals",
        "contains"
      ],
      "values": {
        "group1": "Retargeting Group 1",
        "group2": "Retargeting Group 2",
        "group3": "Retargeting Group 3",
        "group4": "Retargeting Group 4",
        "group5": "Retargeting Group 5",
        "group6": "Retargeting Group 6",
        "group7": "Retargeting Group 7",
        "group8": "Retargeting Group 8",
        "group9": "Retargeting Group 9"
      },
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group1": {
      "name": "Retargeting Group 1",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group2": {
      "name": "Retargeting Group 2",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group3": {
      "name": "Retargeting Group 3",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group4": {
      "name": "Retargeting Group 4",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group5": {
      "name": "Retargeting Group 5",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group6": {
      "name": "Retargeting Group 6",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group7": {
      "name": "Retargeting Group 7",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group8": {
      "name": "Retargeting Group 8",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    },
    "jvxdynsl_group9": {
      "name": "Retargeting Group 9",
      "type": "text",
      "operations": [
        "equals",
        "in",
        "contains",
        "contains-any"
      ],
      "optGroup": "Retargeting"
    }
  },
  "campaignProperties": {
    "name": "Campaign Properties",
    "placementId": {
      "name": "Placement Id",
      "type": "text",
      "operations": [
          "equals",
          "in"
      ]
    },
    "siteId": {
      "name": "Site Id",
      "type": "text",
      "operations": [
          "equals",
          "in"
      ]
    },
    "creativeDim": {
      "name": "Creative Dimension",
      "type": "text",
      "operations": [
          "equals",
          "in"
      ]
    },
    "isBase": {
      "name": "Is Base Unit",
      "type": "combo",
      "operations": [
        "equals"
      ],
      "values": {
        "true": "True",
        "false": "False"
      }
    },
    "campaignId": {
      "name": "Campaign ID",
      "type": "text",
      "operations": [
        "equals"
      ]
    }
  }

}//endofjson



this.operations = {
  "equals": "Is Equal To",
  "greater-than": "Is Greater Than",
  "less-than": "Is Less Than",
  "contains": "Contains All Of",
  "contains-any": "Contains Any Of",
  "in": "Is Contained In"
}




this.conditionOperator = {
  "and": "All of these match",
  "or": "Any of these match",
  "not": "None of these match"
}





} //constructor


getDynamicCampaignConfig(){

	return  this.assetSourceServiceList;
}

getOperations(){
	return this.operations;
}

getConditionOperator(){

    return this.conditionOperator;
}


}//DynamicCampaignCinfig  class end

const dynamicCampaignConfig = new  DynamicCampaignConfig;

export default  dynamicCampaignConfig;