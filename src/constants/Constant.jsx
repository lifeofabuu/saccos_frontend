// Define options for the dropdown
export const loanType = [
    { label: 'Maendeleo', value: 'Maendeleo' },
    { label: 'Elimu na Dharura', value: 'Elimu_na_Dharura' },
    { label: 'Nipige Tafu', value: 'Nipige_Tafu' },
    { label: 'Kujikimu', value: 'Kujikimu' },
    { label: 'CNG', value: 'CNG' },
    { label: 'Sikukuu', value: 'Sikukuu' },
];

// loan amounts for each loan type
export const loanAmounts = {
    Kujikimu: { min: 1000000, max: 2000000},
    Maendeleo: { min: 500000, max: 5000000 },
    Elimu_na_Dharura: { min: 100000, max: 2000000 },
    Nipige_Tafu: { min: 100000, max: 700000 },
    CNG: { min: 2700000, max: 6000000 },
    Sikukuu: { min: 100000, max: 700000 },
};

// conditions for each loan
export const loanConditions = {
    Maendeleo: [
        "Kupata mkopo huu ni lazima kua umeweka akiba kwa miezi isiyopungua mitatu (5) na uwe na hisa asilimia 25% ", 
        "Muda wa malipo (Miaka): 3 - 5", 
        "12% Interest",
        "kiwango cha mkopo (Tzs): 500,000 - 2,000,000"
    ],
    Elimu_na_Dharura: [
        "Kupata mkopo huu ni lazima kua umeweka akiba kwa miezi isiyopungua mitatu (3)", 
        "Muda wa malipo (Miezi): 4 - 12", 
        "12% Interest",
        "kiwango cha mkopo (Tzs): 100,000 - 2000000"
    ],
    Nipige_Tafu: [
        "Kupata mkopo huu ni lazima kua umeweka akiba kwa miezi isiyopungua mitatu (3)",
        "Muda wa malipo (Miezi): 4 - 12", 
        "12% Interest",
        "Kiwango cha mkopo (Tzs): 100,000 - 700,000"
    ],
    Kujikimu: [
        "Mkopo huu hupewa mtu ambaye Kashindwa kulipa hisa kwa mara ya kwanza. Dhamana yake ni mshahara.",  
        "Muda wa malipo: Mwaka Mmoja", 
        "10% Interest",
        "Kiwango cha mkopo (Tzs): 100,000 - 2000000"
    ],
    CNG: [
        "Condition 1 for Mortgages", 
        "Condition 2 for Mortgages", 
        "Condition 3 for Mortgages"
    ],
    Sikukuu: [
        "Condition 1 for Mortgages", 
        "Condition 2 for Mortgages", 
        "Condition 3 for Mortgages"
    ],
};

// for loan manipulation purposes
export const loanManipulationConstants = {
    Maendeleo: {
        gharama: 0.01, // 1% ada ya mkopo
        riba: 0.01,
        adhabu: 0.01
    },
    Elimu_na_Dharura: {
        gharama: 0.01,
        riba: 0.025,
        adhabu: 0.01
    },
    Nipige_Tafu: {
        gharama: 0.00,
        riba: 0.01,
        adhabu: 0.01
    },
    Kujikimu: {
        gharama: 0.01,
        riba: 0.015,
        adhabu: 0.01
    },
    CNG: {
        gharama: 0.01,
        riba: 0.01,
        adhabu: 0.01
    },
    Sikukuu: {
        gharama: 0.00,
        riba: 0.025,
        adhabu: 0.01
    }
}