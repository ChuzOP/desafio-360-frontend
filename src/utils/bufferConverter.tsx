

export const bufferConverter = async (
    bufferData: { type: string; data: number[] },
    fileName = 'image'
) => {
    const uint8Array = new Uint8Array(bufferData.data);
    const blob = new Blob([uint8Array]);
    return new File([blob], `${fileName}.webp`, { type: 'image/webp' });
};