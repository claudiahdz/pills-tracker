export const TimePeriods = ['pre-breakfast', 'breakfast', 'lunch', 'pre-dinner', 'dinner'] as const;

export const TimePeriodLabels = {
    'pre-breakfast': 'Antes del Desayuno',
    'breakfast': 'Desayuno',
    'lunch': 'Comida',
    'pre-dinner': 'Antes de la Cena',
    'dinner': 'Cena'
} as const;

export const TimePeriodInputLabels = {
    'pre-breakfast': 'pre-desayuno',
    'breakfast': 'desayuno',
    'lunch': 'comida',
    'pre-dinner': 'pre-cena',
    'dinner': 'cena'
} as const;