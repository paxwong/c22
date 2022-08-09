const data = [
    {
        "name": "Hong Kong",
        "topLevelDomain": [
            ".hk"
        ],
        "alpha2Code": "HK",
        "alpha3Code": "HKG",
        "callingCodes": [
            "852"
        ],
        "capital": "City of Victoria",
        "altSpellings": [
            "HK",
            "香港"
        ],
        "region": "Asia",
        "subregion": "Eastern Asia",
        "population": 7324300,
        "latlng": [
            22.25,
            114.16666666
        ],
        "demonym": "Chinese",
        "area": 1104.0,
        "gini": 53.3,
        "timezones": [
            "UTC+08:00"
        ],
        "borders": [
            "CHN"
        ],
        "nativeName": "香港",
        "numericCode": "344",
        "currencies": [
            {
                "code": "HKD",
                "name": "Hong Kong dollar",
                "symbol": "$"
            }
        ],
        "languages": [
            {
                "iso639_1": "en",
                "iso639_2": "eng",
                "name": "English",
                "nativeName": "English"
            },
            {
                "iso639_1": "zh",
                "iso639_2": "zho",
                "name": "Chinese",
                "nativeName": "中文 (Zhōngwén)"
            }
        ],
        "translations": {
            "de": "Hong Kong",
            "es": "Hong Kong",
            "fr": "Hong Kong",
            "ja": "香港",
            "it": "Hong Kong",
            "br": "Hong Kong",
            "pt": "Hong Kong",
            "nl": "Hongkong",
            "hr": "Hong Kong",
            "fa": "هنگ‌کنگ"
        },
        "flag": "https://restcountries.eu/data/hkg.svg",
        "regionalBlocs": [],
        "cioc": "HKG"
    }
]

// Array -> for ... of 
// Object -> for ... in

const hk = data[0]
// function getData(){
//     return function (key){
//         for (let key in hk) {
//                 console.log(`${key}: ${hk[key]}`)
//             }
//         }
//     }

// let getAllData = getData()

// getAllData()

for (let key in hk) {

    let newData = {}
    let checkObj = hk[key][0]
    let checkObj2 = hk[key][1]
    let result = ""
    if (Array.isArray(hk[key]) && !(checkObj instanceof Object)) {
        for (let str of hk[key]) {
            if (!result) {
                result = str
            } else result = result + ", " + str
        } console.log(`${key}: ${result}`)
    } else if (Array.isArray(hk[key]) && (checkObj instanceof Object)) {
        for (let newKey in checkObj) {
            console.log(`${key}_${newKey}: ${checkObj[newKey]}`) 
        }
    } else if (hk[key] instanceof Object) {
        for (let subKey in hk[key]) {
            console.log(`${key}_${subKey}: ${hk[key][subKey]}`)
        }
    } else {
        console.log(`${key}: ${hk[key]}`)
    }
}

