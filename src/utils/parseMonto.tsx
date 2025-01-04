export const parseMonto = (value: number) => {
    return value.toLocaleString('es-MX', 
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }
    );
};